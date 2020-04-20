import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screen/Home';
import Komen from '../screen/Komen';
import Notifikasi from '../screen/Notifikasi';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Komens" component={Komen} />
      <Stack.Screen name="Notifikasi" component={Notifikasi} />
    </Stack.Navigator>
  );
};

export default HomeStack;
