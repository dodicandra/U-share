import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import * as Icons from '@expo/vector-icons';

const Eyes = ({ onPress, eyeOpen }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icons.Entypo name={!eyeOpen ? 'eye' : 'eye-with-line'} size={17} />
    </TouchableOpacity>
  );
};

export default Eyes;
