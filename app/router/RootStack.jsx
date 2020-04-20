import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TopNavigator from './TopNavigator';
import Header from '../components/Header';
import { Button } from 'react-native-elements';
import NotifikasiBadge from '../components/NotifikasiBadge';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

const RootStack = () => {
  const auth = useSelector((state) => state.user);
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
