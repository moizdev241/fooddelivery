import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EmptyState, Loader } from '../../components/atoms';
import { MealRow, PageHeader } from '../../components/molecules';
import { RootStackParamList } from '../../navigation/types';
import { Screens } from '../../constants/constants';
import { Meal } from '../../types';
import { listenToMeals, deleteMeal } from '../../services/mealService';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'ManageMeals'>;

export default function ManageMeals({ route, navigation }: Props) {
  const { restaurantId, restaurantName } = route.params;
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

  const onDelete = (meal: Meal) => {
    Alert.alert('Delete meal?', `"${meal.name}" will be removed from the menu.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteMeal(restaurantId, meal.id),
      },
    ]);
  };

  if (loading) return <Loader />;

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <FlatList
        data={meals}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <PageHeader
            title={restaurantName}
            onAddPress={() => navigation.navigate(Screens.MealForm as any, { restaurantId })}
          />
        }
        renderItem={({ item }) => (
          <MealRow
            meal={item}
            onEdit={() =>
              navigation.navigate(Screens.MealForm as any, { restaurantId, meal: item })
            }
            onDelete={() => onDelete(item)}
          />
        )}
        ListEmptyComponent={
          error ? (
            <EmptyState icon="alert-circle" title="Couldn't load meals" subtitle={error} />
          ) : (
            <EmptyState icon="coffee" title="No meals yet" subtitle="Tap + to add your first meal." />
          )
        }
      />
    </SafeAreaView>
  );
}
