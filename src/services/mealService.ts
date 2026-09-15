import {
  db,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from '../firebase';
import { Meal } from '../types';

const mealsRef = (restaurantId: string) => collection(db, 'restaurants', restaurantId, 'meals');

export const listenToMeals = (
  restaurantId: string,
  onChange: (meals: Meal[]) => void,
  onError?: (error: Error) => void,
): (() => void) => {
  return onSnapshot(
    mealsRef(restaurantId),
    snapshot => {
      const list = snapshot.docs.map(d => ({
        id: d.id,
        restaurantId,
        ...(d.data() as any),
      })) as Meal[];
      onChange(list);
    },
    error => onError?.(error),
  );
};

export const createMeal = async (
  restaurantId: string,
  name: string,
  description: string,
  price: number,
): Promise<string> => {
  const docRef = await addDoc(mealsRef(restaurantId), {
    name,
    description,
    price,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updateMeal = async (
  restaurantId: string,
  mealId: string,
  name: string,
  description: string,
  price: number,
): Promise<void> => {
  await updateDoc(doc(db, 'restaurants', restaurantId, 'meals', mealId), {
    name,
    description,
    price,
  });
};

export const deleteMeal = async (restaurantId: string, mealId: string): Promise<void> => {
  await deleteDoc(doc(db, 'restaurants', restaurantId, 'meals', mealId));
};
