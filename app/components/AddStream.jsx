// @flow
import * as Icons from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';
import { useSelector } from 'react-redux';

const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity);
interface Props {
  onPress: (event: GestureResponderEvent) => void;
  y: Animated.Node<number>;
}

const AddStream: React.FC<Props> = ({ onPress, y }) => {
  const auth = useSelector(state => state.user);

  const scale = interpolate(y, {
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolateRight: Extrapolate.CLAMP,
  });

  return auth.autentikasi !== null ? (
    <AnimatedTouch
      style={[styles.container, { transform: [{ scale }] }]}
      onPress={onPress}
    >
      <Icons.Feather name="plus" color="white" size={27} />
    </AnimatedTouch>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    padding: 5,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 100,
  },
});

export default AddStream;
