import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import * as Icons from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const AddStream = ({ style, onPress }) => {
  const auth = useSelector((state) => state.user);
  return auth.autentikasi !== null ? (
    <View style={{ ...styles.container, ...style }}>
      <TouchableOpacity onPress={onPress}>
        <Icons.Feather name="plus" color="white" size={27} />
      </TouchableOpacity>
    </View>
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
  },
});

export default AddStream;
