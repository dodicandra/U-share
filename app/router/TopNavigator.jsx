import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import HomeStack from './HomeStack';
import ProfileStack from './PrifileStack';

const Tab = createMaterialTopTabNavigator();

const TopNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default TopNavigator;
