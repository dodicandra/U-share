// @flow
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';
import NotifikasiBadge from '../components/NotifikasiBadge';
import TopNavigator from './TopNavigator';

const Stack = createStackNavigator();

const RootStack = () => {
  const auth = useSelector(state => state.user);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            height: 80,
          },
          headerRight: () => auth.autentikasi !== null && <NotifikasiBadge />,
          headerRightContainerStyle: {
            marginRight: 25,
          },
        }}
      >
        <Stack.Screen name="U-Share" component={TopNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
