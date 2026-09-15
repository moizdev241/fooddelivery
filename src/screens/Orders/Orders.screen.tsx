import React, { useEffect, useState } from 'react';
import { Alert, FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState, Loader, Txt } from '../../components/atoms';
import { OrderCard, PageHeader } from '../../components/molecules';
import { useAppSelector } from '../../redux/hooks';
import { Order } from '../../types';
import { ACTIVE_OPACITY, ORDER_STATUS } from '../../constants/constants';
import { listenToUserOrders, cancelOrder, markReceived } from '../../services/orderService';
import styles from './styles';

export default function Orders() {
  const profile = useAppSelector(state => state.user.profile);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!profile) return;
    setError('');
    const unsubscribe = listenToUserOrders(
      profile.uid,
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
  }, [profile]);

  const onCancel = (order: Order) => {
    if (!profile) return;
    Alert.alert('Cancel this order?', 'This cannot be undone.', [
      { text: 'Keep Order', style: 'cancel' },
      {
        text: 'Cancel Order',
        style: 'destructive',
        onPress: () => cancelOrder(order.id, profile.uid),
      },
    ]);
  };

  const onMarkReceived = (order: Order) => {
    if (!profile) return;
    markReceived(order.id, profile.uid);
  };

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<PageHeader title="Your Orders" />}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            footer={
              item.status === ORDER_STATUS.PLACED ? (
                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    activeOpacity={ACTIVE_OPACITY}
                    style={[styles.actionButton, styles.cancelButton]}
                    onPress={() => onCancel(item)}>
                    <Txt style={[styles.actionButtonText, styles.cancelButtonText]}>
                      Cancel Order
                    </Txt>
                  </TouchableOpacity>
                </View>
              ) : item.status === ORDER_STATUS.DELIVERED ? (
                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    activeOpacity={ACTIVE_OPACITY}
                    style={styles.actionButton}
                    onPress={() => onMarkReceived(item)}>
                    <Txt style={styles.actionButtonText}>Mark Received</Txt>
                  </TouchableOpacity>
                </View>
              ) : null
            }
          />
        )}
        ListEmptyComponent={
          error ? (
            <EmptyState icon="alert-circle" title="Couldn't load your orders" subtitle={error} />
          ) : (
            <EmptyState
              icon="clipboard"
              title="No orders yet"
              subtitle="Orders you place will show up here."
            />
          )
        }
      />
    </SafeAreaView>
  );
}
