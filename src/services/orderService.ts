import {
  db,
  collection,
  doc,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  arrayUnion,
} from '../firebase';
import { Order, OrderItem, StatusChange } from '../types';
import { ORDER_STATUS } from '../constants/constants';

const ordersRef = () => collection(db, 'orders');

export const placeOrder = async (
  userId: string,
  userName: string,
  restaurantId: string,
  restaurantName: string,
  items: OrderItem[],
): Promise<string> => {
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const firstChange: StatusChange = {
    status: ORDER_STATUS.PLACED,
    changedAt: Date.now(),
    changedBy: userId,
  };

  const docRef = await addDoc(ordersRef(), {
    userId,
    userName,
    restaurantId,
    restaurantName,
    items,
    totalAmount,
    status: ORDER_STATUS.PLACED,
    statusHistory: [firstChange],
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const listenToUserOrders = (
  userId: string,
  onChange: (orders: Order[]) => void,
  onError?: (error: Error) => void,
): (() => void) => {
  const q = query(ordersRef(), where('userId', '==', userId), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    snapshot => onChange(mapOrders(snapshot)),
    error => onError?.(error),
  );
};

export const listenToRestaurantOrders = (
  restaurantIds: string[],
  onChange: (orders: Order[]) => void,
  onError?: (error: Error) => void,
): (() => void) => {
  if (restaurantIds.length === 0) {
    onChange([]);
    return () => {};
  }
  const q = query(
    ordersRef(),
    where('restaurantId', 'in', restaurantIds.slice(0, 10)),
    orderBy('createdAt', 'desc'),
  );
  return onSnapshot(
    q,
    snapshot => onChange(mapOrders(snapshot)),
    error => onError?.(error),
  );
};

// Each transition writes both the new status and an appended history entry
// in one update, mirrored by an equally strict check in firestore.rules —
// this file is a first line of defense (and what drives the UI), not the
// only one.
const applyTransition = async (
  orderId: string,
  status: StatusChange['status'],
  changedBy: string,
): Promise<void> => {
  const change: StatusChange = { status, changedAt: Date.now(), changedBy };
  await updateDoc(doc(db, 'orders', orderId), {
    status,
    statusHistory: arrayUnion(change),
  });
};

// Regular User only
export const cancelOrder = (orderId: string, userId: string): Promise<void> =>
  applyTransition(orderId, ORDER_STATUS.CANCELED, userId);

// Regular User only
export const markReceived = (orderId: string, userId: string): Promise<void> =>
  applyTransition(orderId, ORDER_STATUS.RECEIVED, userId);

// Restaurant Owner only
export const startProcessing = (orderId: string, ownerId: string): Promise<void> =>
  applyTransition(orderId, ORDER_STATUS.PROCESSING, ownerId);

// Restaurant Owner only
export const markInRoute = (orderId: string, ownerId: string): Promise<void> =>
  applyTransition(orderId, ORDER_STATUS.IN_ROUTE, ownerId);

// Restaurant Owner only
export const markDelivered = (orderId: string, ownerId: string): Promise<void> =>
  applyTransition(orderId, ORDER_STATUS.DELIVERED, ownerId);

const mapOrders = (snapshot: any): Order[] =>
  snapshot.docs.map((d: any) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : Date.now(),
    } as Order;
  });
