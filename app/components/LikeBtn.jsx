import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Icons from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { likeAction, unlikeAction } from '../redux/actions/dataActions';

export const LikeBtn = ({ streamId, navigation }) => {
  const auth = useSelector((state) => state.user);
  const UI = useSelector((state) => state.UI);
  const dispatch = useDispatch();

  const likedStream = () => {
    if (auth.likes && auth.likes.find((like) => like.streamId === streamId))
      return true;
    else return false;
  };

  const likeStream = () => {
    dispatch(likeAction(streamId));
  };

  const unLikeStream = () => {
    console.log('UN');
    dispatch(unlikeAction(streamId));
  };

  return auth.autentikasi === null ? (
    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      <Icons.AntDesign color="#acacac" name="heart" size={20} />
    </TouchableOpacity>
  ) : likedStream() ? (
    <TouchableOpacity onPress={unLikeStream}>
      <Icons.AntDesign name="heart" color="red" size={20} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={likeStream}>
      <Icons.AntDesign name="heart" color="#acacac" size={20} />
    </TouchableOpacity>
  );
};

export const KomenBtn = () => {
  return <Icons.MaterialIcons color="#2961ba" name="comment" size={20} />;
};
