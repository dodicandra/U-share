import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProFileScren from '../screen/Profle';
import Register from '../screen/Register';
import EditProfile from '../screen/EditProfile';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profiles" component={ProFileScren} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
