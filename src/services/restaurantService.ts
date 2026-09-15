import {
  db,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  serverTimestamp,
} from '../firebase';
import { Restaurant } from '../types';

const restaurantsRef = () => collection(db, 'restaurants');

export const listenToRestaurants = (
  onChange: (restaurants: Restaurant[]) => void,
  onError?: (error: Error) => void,
): (() => void) => {
  return onSnapshot(
    restaurantsRef(),
    snapshot => {
      const list = snapshot.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Restaurant[];
      onChange(list);
    },
    error => onError?.(error),
  );
};

export const listenToOwnerRestaurants = (
  ownerId: string,
  onChange: (restaurants: Restaurant[]) => void,
  onError?: (error: Error) => void,
): (() => void) => {
  const q = query(restaurantsRef(), where('ownerId', '==', ownerId));
  return onSnapshot(
    q,
    snapshot => {
      const list = snapshot.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as Restaurant[];
      onChange(list);
    },
    error => onError?.(error),
  );
};

export const createRestaurant = async (
  ownerId: string,
  name: string,
  description: string,
): Promise<string> => {
  const docRef = await addDoc(restaurantsRef(), {
    ownerId,
    name,
    description,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updateRestaurant = async (
  id: string,
  name: string,
  description: string,
): Promise<void> => {
  await updateDoc(doc(db, 'restaurants', id), { name, description });
};

export const deleteRestaurant = async (id: string): Promise<void> => {
  const mealsSnap = await getDocs(collection(db, 'restaurants', id, 'meals'));
  await Promise.all(mealsSnap.docs.map(m => deleteDoc(m.ref)));
  await deleteDoc(doc(db, 'restaurants', id));
};
