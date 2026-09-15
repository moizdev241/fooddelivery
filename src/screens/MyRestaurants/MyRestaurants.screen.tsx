import React, { useEffect, useState } from 'react';
import { Alert, FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import { EmptyState, Loader, Txt } from '../../components/atoms';
import { PageHeader, RestaurantCard } from '../../components/molecules';
import { RootStackParamList, OwnerTabParamList } from '../../navigation/types';
import { Screens, ACTIVE_OPACITY } from '../../constants/constants';
import { Restaurant } from '../../types';
import { listenToOwnerRestaurants, deleteRestaurant } from '../../services/restaurantService';
import { useAppSelector } from '../../redux/hooks';
import { theme } from '../../theme';
import styles from './styles';

type Props = CompositeScreenProps<
  BottomTabScreenProps<OwnerTabParamList, 'MyRestaurants'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function MyRestaurants({ navigation }: Props) {
  const profile = useAppSelector(state => state.user.profile);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!profile) return;
    const unsubscribe = listenToOwnerRestaurants(
      profile.uid,
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
  }, [profile]);

  const onDelete = (restaurant: Restaurant) => {
    Alert.alert(
      'Delete restaurant?',
      `"${restaurant.name}" and all of its meals will be removed permanently.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteRestaurant(restaurant.id),
        },
      ],
    );
  };

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FlatList
        data={restaurants}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <PageHeader
            title="My Restaurants"
            onAddPress={() => navigation.navigate(Screens.RestaurantForm as any)}
          />
        }
        renderItem={({ item }) => (
          <RestaurantCard
            restaurant={item}
            onPress={() =>
              navigation.navigate(Screens.ManageMeals as any, {
                restaurantId: item.id,
                restaurantName: item.name,
              })
            }
            rightAccessory={
              <View style={styles.ownerActions}>
                <TouchableOpacity
                  activeOpacity={ACTIVE_OPACITY}
                  style={styles.linkRow}
                  onPress={() =>
                    navigation.navigate(Screens.RestaurantForm as any, { restaurant: item })
                  }>
                  <Feather name="edit-2" size={14} color={theme.palette.label} />
                  <Txt style={styles.link}>Edit</Txt>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={ACTIVE_OPACITY}
                  style={styles.linkRow}
                  onPress={() => onDelete(item)}>
                  <Feather name="trash-2" size={14} color={theme.palette.error} />
                  <Txt style={[styles.link, styles.deleteLink]}>Delete</Txt>
                </TouchableOpacity>
              </View>
            }
          />
        )}
        ListEmptyComponent={
          error ? (
            <EmptyState icon="alert-circle" title="Couldn't load restaurants" subtitle={error} />
          ) : (
            <EmptyState
              icon="home"
              title="No restaurants yet"
              subtitle="Tap + to add your first restaurant."
            />
          )
        }
      />
    </SafeAreaView>
  );
}
