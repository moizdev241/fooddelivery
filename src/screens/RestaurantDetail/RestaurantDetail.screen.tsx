import React, { useEffect, useState } from 'react';
import { Alert, FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EmptyState, Loader, Txt } from '../../components/atoms';
import { MealRow } from '../../components/molecules';
import { RootStackParamList } from '../../navigation/types';
import { Screens, ACTIVE_OPACITY } from '../../constants/constants';
import { Meal } from '../../types';
import { listenToMeals } from '../../services/mealService';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addItem, decrementItem } from '../../redux/slices/cartSlice';
import { formatCurrency } from '../../utils/common';
import { theme } from '../../theme';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'RestaurantDetail'>;

export default function RestaurantDetail({ route, navigation }: Props) {
  const { restaurantId, restaurantName, restaurantDescription } = route.params;
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);

  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = listenToMeals(
      restaurantId,
      list => {
        setMeals(list);
        setLoading(false);
      },
      err => {
        setError(err.message);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, [restaurantId]);

  const qtyFor = (mealId: string) =>
    cart.restaurantId === restaurantId
      ? cart.items.find(i => i.mealId === mealId)?.quantity ?? 0
      : 0;

  const onAdd = (meal: Meal) => {
    if (cart.restaurantId && cart.restaurantId !== restaurantId) {
      Alert.alert(
        'Start a new order?',
        `Your cart has items from ${cart.restaurantName}. Orders can only include meals from one restaurant.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Start New',
            style: 'destructive',
            onPress: () =>
              dispatch(
                addItem({
                  restaurantId,
                  restaurantName,
                  meal: { mealId: meal.id, name: meal.name, price: meal.price },
                }),
              ),
          },
        ],
      );
      return;
    }
    dispatch(
      addItem({
        restaurantId,
        restaurantName,
        meal: { mealId: meal.id, name: meal.name, price: meal.price },
      }),
    );
  };

  const cartTotal = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cartCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const showCartBar = cart.restaurantId === restaurantId && cartCount > 0;

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <FlatList
        data={meals}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Txt style={styles.restaurantName}>{restaurantName}</Txt>
            {restaurantDescription ? (
              <Txt style={styles.restaurantDescription}>{restaurantDescription}</Txt>
            ) : null}
          </View>
        }
        renderItem={({ item }) => (
          <MealRow
            meal={item}
            quantity={qtyFor(item.id)}
            onAdd={() => onAdd(item)}
            onRemove={() => dispatch(decrementItem({ mealId: item.id }))}
          />
        )}
        ListEmptyComponent={
          error ? (
            <EmptyState icon="alert-circle" title="Couldn't load the menu" subtitle={error} />
          ) : (
            <EmptyState icon="coffee" title="No meals available yet" />
          )
        }
      />

      {showCartBar ? (
        <TouchableOpacity
          activeOpacity={ACTIVE_OPACITY}
          style={styles.cartBar}
          onPress={() => navigation.navigate(Screens.Cart as any)}>
          <View>
            <Txt style={styles.cartBarText}>View Cart</Txt>
            <Txt style={styles.cartBarSubtext}>
              {cartCount} item{cartCount > 1 ? 's' : ''}
            </Txt>
          </View>
          <View style={styles.cartBarRight}>
            <Txt style={styles.cartBarText}>{formatCurrency(cartTotal)}</Txt>
            <Feather name="arrow-right" size={18} color={theme.palette.white} />
          </View>
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
}
