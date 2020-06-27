// @flow
import * as Icons from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { likeAction, unlikeAction } from '../redux/actions/dataActions';

export const LikeBtn = ({ streamId, navigation }) => {
  const auth = useSelector(state => state.user);
  const dispatch = useDispatch();

  const likedStream = () => {
    if (auth.likes && auth.likes.find(like => like.streamId === streamId)) {
      return true;
    }
    return false;
  };

  const likeStream = () => {
    dispatch(likeAction(streamId));
  };

  const unLikeStream = () => {
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

export const KomenBtn = () => (
  <Icons.MaterialIcons color="#2961ba" name="comment" size={20} />
);
