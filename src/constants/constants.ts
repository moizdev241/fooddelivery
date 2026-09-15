export const APP_NAME = 'Panda Express';

export const ACTIVE_OPACITY = 0.7;

// The "Web client" OAuth client ID Firebase auto-created once the Google
// sign-in provider was enabled — the `client_type: 3` entry in
// android/app/google-services.json. Not a secret — safe to ship in the client.
export const GOOGLE_WEB_CLIENT_ID =
  '176800658070-pu4h1qbgcqco4br57djbggpjlagmeg30.apps.googleusercontent.com';

// Roles
export const ROLE_USER = 'user';
export const ROLE_OWNER = 'owner';
export type UserRole = typeof ROLE_USER | typeof ROLE_OWNER;

// Order status — forward-only flow, each transition owned by exactly one role:
//   Placed --(user)--> Canceled
//   Placed --(owner)--> Processing --(owner)--> In Route --(owner)--> Delivered --(user)--> Received
export const ORDER_STATUS = {
  PLACED: 'placed',
  CANCELED: 'canceled',
  PROCESSING: 'processing',
  IN_ROUTE: 'in_route',
  DELIVERED: 'delivered',
  RECEIVED: 'received',
} as const;
export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  placed: 'Placed',
  canceled: 'Canceled',
  processing: 'Processing',
  in_route: 'In Route',
  delivered: 'Delivered',
  received: 'Received',
};

// Screen names
export const Screens = {
  // Auth
  SignIn: 'SignIn',
  CompleteProfile: 'CompleteProfile',

  // Shared
  Profile: 'Profile',

  // Regular user
  RestaurantList: 'RestaurantList',
  RestaurantDetail: 'RestaurantDetail',
  Cart: 'Cart',
  Orders: 'Orders',

  // Restaurant owner
  MyRestaurants: 'MyRestaurants',
  RestaurantForm: 'RestaurantForm',
  ManageMeals: 'ManageMeals',
  MealForm: 'MealForm',
  OwnerOrders: 'OwnerOrders',

  // Tabs (roots)
  UserTabs: 'UserTabs',
  OwnerTabs: 'OwnerTabs',
} as const;
