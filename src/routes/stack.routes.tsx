import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import RegisterTask from '../screens/RegisterTask';

const {Screen, Navigator} = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Home" component={Home} />
      <Screen name="AddTask" component={RegisterTask} />
    </Navigator>
  );
}
