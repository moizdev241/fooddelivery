import { Meal, Restaurant } from '../types';

export type RootStackParamList = {
  SignIn: undefined;
  CompleteProfile: undefined;
  UserTabs: undefined;
  OwnerTabs: undefined;
  RestaurantDetail: { restaurantId: string; restaurantName: string; restaurantDescription?: string };
  Cart: undefined;
  RestaurantForm: { restaurant?: Restaurant } | undefined;
  ManageMeals: { restaurantId: string; restaurantName: string };
  MealForm: { restaurantId: string; meal?: Meal } | undefined;
};

export type UserTabParamList = {
  RestaurantList: undefined;
  Orders: undefined;
  Profile: undefined;
};

export type OwnerTabParamList = {
  MyRestaurants: undefined;
  OwnerOrders: undefined;
  Profile: undefined;
};
