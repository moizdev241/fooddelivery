import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserTabsNavigator from './UserTabsNavigator';
import OwnerTabsNavigator from './OwnerTabsNavigator';
import {
  RestaurantDetail,
  Cart,
  RestaurantForm,
  ManageMeals,
  MealForm,
} from '../screens';
import { Screens, ROLE_OWNER } from '../constants/constants';
import { RootStackParamList } from './types';
import { useAppSelector } from '../redux/hooks';
import { theme } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

const detailScreenOptions = {
  headerShown: true,
  headerBackTitleVisible: false,
  headerShadowVisible: false,
  headerTintColor: theme.palette.primary,
  headerStyle: { backgroundColor: theme.palette.bg },
  headerTitleStyle: { color: theme.palette.label },
};

export default function AppNavigator() {
  const role = useAppSelector(state => state.user.profile?.role);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {role === ROLE_OWNER ? (
        <Stack.Screen name={Screens.OwnerTabs as 'OwnerTabs'} component={OwnerTabsNavigator} />
      ) : (
        <Stack.Screen name={Screens.UserTabs as 'UserTabs'} component={UserTabsNavigator} />
      )}

      <Stack.Screen
        name={Screens.RestaurantDetail as 'RestaurantDetail'}
        component={RestaurantDetail}
        options={{ ...detailScreenOptions, title: '' }}
      />
      <Stack.Screen
        name={Screens.Cart as 'Cart'}
        component={Cart}
        options={{ ...detailScreenOptions, title: 'Cart' }}
      />
      <Stack.Screen
        name={Screens.RestaurantForm as 'RestaurantForm'}
        component={RestaurantForm}
        options={{ ...detailScreenOptions, title: '' }}
      />
      <Stack.Screen
        name={Screens.ManageMeals as 'ManageMeals'}
        component={ManageMeals}
        options={{ ...detailScreenOptions, title: '' }}
      />
      <Stack.Screen
        name={Screens.MealForm as 'MealForm'}
        component={MealForm}
        options={{ ...detailScreenOptions, title: '' }}
      />
    </Stack.Navigator>
  );
}
