import { UserRole, OrderStatus } from './constants/constants';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  isBlocked: boolean;
  createdAt?: number;
}

export interface Restaurant {
  id: string;
  ownerId: string;
  name: string;
  description: string; // type of food
  createdAt?: number;
}

export interface Meal {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  createdAt?: number;
}

export interface OrderItem {
  mealId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface StatusChange {
  status: OrderStatus;
  changedAt: number;
  changedBy: string; // uid of whoever made the change
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  restaurantId: string;
  restaurantName: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  statusHistory: StatusChange[];
  createdAt: number; // when the order was placed
}
