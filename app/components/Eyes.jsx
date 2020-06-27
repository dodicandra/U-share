// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';
import * as Icons from '@expo/vector-icons';

interface EyesProps {
  onPress: () => void;
  eyeOpen: boolean;
}

const Eyes = ({ onPress, eyeOpen }: EyesProps) => (
  <TouchableOpacity onPress={onPress}>
    <Icons.Entypo name={!eyeOpen ? 'eye' : 'eye-with-line'} size={17} />
  </TouchableOpacity>
);

export default Eyes;
