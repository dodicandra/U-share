import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TopNavigator from './TopNavigator';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            height: 50,
          },
        }}
      >
        <Stack.Screen name="U-Share" component={TopNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
