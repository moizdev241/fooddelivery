import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MyRestaurants, OwnerOrders, Profile } from '../screens';
import { Screens } from '../constants/constants';
import { OwnerTabParamList } from './types';
import { tabScreenOptions, makeTabIcon } from './tabBarOptions';

const Tab = createBottomTabNavigator<OwnerTabParamList>();

const restaurantsIcon = makeTabIcon('home');
const ordersIcon = makeTabIcon('list');
const profileIcon = makeTabIcon('user');

export default function OwnerTabsNavigator() {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen
        name={Screens.MyRestaurants as 'MyRestaurants'}
        component={MyRestaurants}
        options={{ tabBarLabel: 'Restaurants', tabBarIcon: restaurantsIcon }}
      />
      <Tab.Screen
        name={Screens.OwnerOrders as 'OwnerOrders'}
        component={OwnerOrders}
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
