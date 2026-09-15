import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState, Loader, Txt } from '../../components/atoms';
import { OrderCard, PageHeader } from '../../components/molecules';
import { useAppSelector } from '../../redux/hooks';
import { Order } from '../../types';
import { ACTIVE_OPACITY, ORDER_STATUS } from '../../constants/constants';
import { listenToOwnerRestaurants } from '../../services/restaurantService';
import {
  listenToRestaurantOrders,
  startProcessing,
  markInRoute,
  markDelivered,
} from '../../services/orderService';
import styles from './styles';

export default function OwnerOrders() {
  const profile = useAppSelector(state => state.user.profile);
  const [restaurantIds, setRestaurantIds] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!profile) return;
    return listenToOwnerRestaurants(
      profile.uid,
      list => setRestaurantIds(list.map(r => r.id)),
      err => {
        setError(err.message);
        setLoading(false);
      },
    );
  }, [profile]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = listenToRestaurantOrders(
      restaurantIds,
      list => {
        setOrders(list);
        setLoading(false);
      },
      err => {
        setError(err.message);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, [restaurantIds]);

  if (loading) return <Loader />;

  const onAdvance = (order: Order) => {
    if (!profile) return;
    switch (order.status) {
      case ORDER_STATUS.PLACED:
        startProcessing(order.id, profile.uid);
        break;
      case ORDER_STATUS.PROCESSING:
        markInRoute(order.id, profile.uid);
        break;
      case ORDER_STATUS.IN_ROUTE:
        markDelivered(order.id, profile.uid);
        break;
    }
  };

  const advanceLabel: Partial<Record<Order['status'], string>> = {
    [ORDER_STATUS.PLACED]: 'Start Processing',
    [ORDER_STATUS.PROCESSING]: 'Mark In Route',
    [ORDER_STATUS.IN_ROUTE]: 'Mark Delivered',
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<PageHeader title="Incoming Orders" />}
        renderItem={({ item }) => {
          const label = advanceLabel[item.status];
          return (
            <OrderCard
              order={item}
              showCustomer
              footer={
                label ? (
                  <View style={styles.actionsRow}>
                    <TouchableOpacity
                      activeOpacity={ACTIVE_OPACITY}
                      style={styles.actionButton}
                      onPress={() => onAdvance(item)}
                    >
                      <Txt style={styles.actionButtonText}>{label}</Txt>
                    </TouchableOpacity>
                  </View>
                ) : null
              }
            />
          );
        }}
        ListEmptyComponent={
          error ? (
            <EmptyState icon="alert-circle" title="Couldn't load orders" subtitle={error} />
          ) : (
            <EmptyState
              icon="clipboard"
              title="No orders yet"
              subtitle="Orders placed at your restaurants will show up here."
            />
          )
        }
      />
    </SafeAreaView>
  );
}
