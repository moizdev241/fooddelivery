import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import { EmptyState, Loader } from '../../components/atoms';
import { PageHeader, RestaurantCard } from '../../components/molecules';
import { RootStackParamList, UserTabParamList } from '../../navigation/types';
import { Screens } from '../../constants/constants';
import { Restaurant } from '../../types';
import { listenToRestaurants } from '../../services/restaurantService';
import styles from './styles';

type Props = CompositeScreenProps<
  BottomTabScreenProps<UserTabParamList, 'RestaurantList'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function RestaurantList({ navigation }: Props) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = listenToRestaurants(
      list => {
        setRestaurants(list);
        setLoading(false);
      },
      err => {
        setError(err.message);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, []);

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FlatList
        data={restaurants}
        keyExtractor={item => item.id}
        ListHeaderComponent={<PageHeader title="Restaurants" subtitle="Pick a place to order from" />}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <RestaurantCard
            restaurant={item}
            onPress={() =>
              navigation.navigate(Screens.RestaurantDetail as any, {
                restaurantId: item.id,
                restaurantName: item.name,
                restaurantDescription: item.description,
              })
            }
          />
        )}
        ListEmptyComponent={
          error ? (
            <EmptyState icon="alert-circle" title="Couldn't load restaurants" subtitle={error} />
          ) : (
            <EmptyState
              icon="shopping-bag"
              title="No restaurants yet"
              subtitle="Check back soon — new restaurants are on the way."
            />
          )
        }
      />
    </SafeAreaView>
  );
}
