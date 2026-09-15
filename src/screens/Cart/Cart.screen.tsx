import React, { useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomButton, EmptyState, Txt } from '../../components/atoms';
import { MealRow } from '../../components/molecules';
import { RootStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addItem, decrementItem, clearCart } from '../../redux/slices/cartSlice';
import { placeOrder } from '../../services/orderService';
import { formatCurrency } from '../../utils/common';
import { theme } from '../../theme';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

export default function Cart({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);
  const profile = useAppSelector(state => state.user.profile);
  const [loading, setLoading] = useState(false);

  const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const onPlaceOrder = async () => {
    if (!profile || !cart.restaurantId || !cart.restaurantName || cart.items.length === 0) {
      return;
    }
    setLoading(true);
    try {
      await placeOrder(
        profile.uid,
        profile.name,
        cart.restaurantId,
        cart.restaurantName,
        cart.items,
      );
      dispatch(clearCart());
      Alert.alert('Order placed', 'Your order has been sent to the restaurant.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (e: any) {
      Alert.alert('Could not place order', e?.message ?? 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        <EmptyState
          icon="shopping-cart"
          title="Your cart is empty"
          subtitle="Add meals from a restaurant to get started."
        />
        <CustomButton
          title="Browse Restaurants"
          variant="secondary"
          onPress={() => navigation.goBack()}
          style={styles.emptyButton}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <FlatList
        data={cart.items}
        keyExtractor={item => item.mealId}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Txt style={styles.title}>Your Order</Txt>
            <View style={styles.restaurantRow}>
              <Feather name="home" size={13} color={theme.palette.secondaryLabel} />
              <Txt style={styles.restaurantName}>{cart.restaurantName}</Txt>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <MealRow
            meal={{
              id: item.mealId,
              restaurantId: cart.restaurantId ?? '',
              name: item.name,
              description: '',
              price: item.price,
            }}
            quantity={item.quantity}
            onAdd={() =>
              dispatch(
                addItem({
                  restaurantId: cart.restaurantId!,
                  restaurantName: cart.restaurantName!,
                  meal: { mealId: item.mealId, name: item.name, price: item.price },
                }),
              )
            }
            onRemove={() => dispatch(decrementItem({ mealId: item.mealId }))}
          />
        )}
      />

      <View style={styles.summary}>
        <View style={styles.totalRow}>
          <Txt style={styles.totalLabel}>Total</Txt>
          <Txt style={styles.totalValue}>{formatCurrency(total)}</Txt>
        </View>
        <CustomButton
          title="Place Order"
          icon="check-circle"
          onPress={onPlaceOrder}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
}
