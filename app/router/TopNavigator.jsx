import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as Icons from '@expo/vector-icons';

import HomeStack from './HomeStack';
import ProfileStack from './PrifileStack';

const Tab = createMaterialTopTabNavigator();

const TopNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        showIcon: true,
        activeTintColor: '#4976bf',
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icons.FontAwesome5 name="vr-cardboard" color={color} size={20} />
          ),
        }}
        name="Home"
        component={HomeStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icons.FontAwesome5 color={color} name="codepen" size={20} />
          ),
        }}
        name="Profile"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

export default TopNavigator;
