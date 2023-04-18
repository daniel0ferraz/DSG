import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const {Screen, Navigator} = createBottomTabNavigator();

import IconHomeActive from '../assets/icon-home-active.svg';
import IconHome from '../assets/icon-home.svg';
import IconCheckActive from '../assets/icon-check-active.svg';
import IconCheck from '../assets/icon-check.svg';
import IconBell from '../assets/icon-bell.svg';

import Home from '../screens/Home';
import RegisterTask from '../screens/RegisterTask';
import Notification from '../screens/Notification';

export function TabRoutes() {
  return (
    <Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: '#6fea8b ',
        tabBarInactiveTintColor: '#C4C4C4',
        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 50,
          borderTopWidth: 0,
          shadowOffset: {
            width: 0,
            height: 0,
          },

          borderTopColor: 'transparent',

          elevation: 1,
          shadowColor: '#5bc4ff',
          shadowOpacity: 0,

          shadowRadius: 0,
        },
      }}>
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({size, focused}) =>
            focused ? <IconHomeActive /> : <IconHome />,
        }}
      />
      <Screen
        name="AddTask"
        component={RegisterTask}
        options={{
          tabBarIcon: ({size, focused}) =>
            focused ? <IconCheckActive /> : <IconCheck />,
        }}
      />

      <Screen
        name="Notif"
        component={Notification}
        options={{
          tabBarIcon: ({size, color}) => (
            <IconBell width={size} height={size} />
          ),
        }}
      />
    </Navigator>
  );
}
