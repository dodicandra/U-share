import React from 'react';
import { Overlay } from 'react-native-elements';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

const Modal = ({ children, isVisible, onBackdropPress }) => {
  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(255, 255, 255, .5)"
      overlayBackgroundColor="#acacac"
      width={width - 50}
      height={200}
      overlayStyle={{ alignItems: 'center', justifyContent: 'center' }}
      borderRadius={6}
      onBackdropPress={onBackdropPress}
    >
      {children}
    </Overlay>
  );
};

export default Modal;
