import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screen/Home';
import Komen from '../screen/Komen';
import Notifikasi from '../screen/Notifikasi';
import UserData from '../screen/UserData';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen key="Home" name="Home" component={Home} />
      <Stack.Screen name="Komens" component={Komen} />
      <Stack.Screen name="Notifikasi" component={Notifikasi} />
      <Stack.Screen name="UserData" component={UserData} />
    </Stack.Navigator>
  );
};

export default HomeStack;
