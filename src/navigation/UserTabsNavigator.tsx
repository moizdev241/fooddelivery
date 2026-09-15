import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RestaurantList, Orders, Profile } from '../screens';
import { Screens } from '../constants/constants';
import { UserTabParamList } from './types';
import { tabScreenOptions, makeTabIcon } from './tabBarOptions';

const Tab = createBottomTabNavigator<UserTabParamList>();

const restaurantsIcon = makeTabIcon('home');
const ordersIcon = makeTabIcon('list');
const profileIcon = makeTabIcon('user');

export default function UserTabsNavigator() {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen
        name={Screens.RestaurantList as 'RestaurantList'}
        component={RestaurantList}
        options={{ tabBarLabel: 'Restaurants', tabBarIcon: restaurantsIcon }}
      />
      <Tab.Screen
        name={Screens.Orders as 'Orders'}
        component={Orders}
        options={{ tabBarLabel: 'Orders', tabBarIcon: ordersIcon }}
      />
      <Tab.Screen
        name={Screens.Profile as 'Profile'}
        component={Profile}
        options={{ tabBarLabel: 'Profile', tabBarIcon: profileIcon }}
      />
    </Tab.Navigator>
  );
}
