import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screen/Home';
import Komen from '../screen/Komen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Komens" component={Komen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
