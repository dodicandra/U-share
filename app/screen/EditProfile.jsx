import React, { useState } from 'react';
import { StyleSheet, View, Platform, ActivityIndicator } from 'react-native';
import { Input, Text, Button, Avatar, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Icons from '@expo/vector-icons';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { editUserAction, editPicAction } from '../redux/actions/userActions';

const EditProfile = ({ route }) => {
  const { imageUrl, bio, website, location } = route.params;
  const navigation = useNavigation();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const pickImage = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!res.cancelled) {
        formData(res);
        // const data = new FormData();
        // data.append('submit', 'ok');
        // data.append('file', {
        //   type: 'image/jpg/png',
        //   uri: res.uri,
        //   name: 'upload.jpg',
        // });
        // dispatch(editPicAction(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formData = async (photo) => {
    const data = new FormData();
    data.append('image', {
      name: photo.uri,
      type: 'image/jpg/png/jpeg',
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });

    await dispatch(editPicAction(data));
  };

  const submitProfile = async (value) => {
    await dispatch(editUserAction(value));
    navigation.navigate('Profiles');
  };

  return (
    <View style={styles.caontainer}>
      <View style={styles.profileEdit}>
        {user.loading ? (
          <ActivityIndicator size="large" color="red" />
        ) : (
          <Avatar rounded source={{ uri: imageUrl }} size="large" />
        )}

        <Icons.AntDesign
          name="camerao"
          size={23}
          style={styles.Icons}
          onPress={pickImage}
        />
      </View>
      <Formik
        initialValues={{
          bio: bio,
          website: website.substring(8),
          location: location,
        }}
        onSubmit={(value) => {
          submitProfile(value);
        }}
      >
        {(props) => (
          <>
            <Input
              multiline={true}
              placeholder="Bio..."
              onChangeText={props.handleChange('bio')}
              value={props.values.bio}
              containerStyle={{ marginVertical: 20 }}
            />
            <Input
              placeholder="website url..."
              onChangeText={props.handleChange('website')}
              value={props.values.website}
              containerStyle={{ marginVertical: 20 }}
            />
            <Input
              placeholder="location..."
              onChangeText={props.handleChange('location')}
              value={props.values.location}
              containerStyle={{ marginVertical: 20 }}
            />
            <Button
              title="Edit"
              onPress={props.handleSubmit}
              containerStyle={{ width: 100 }}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  caontainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  Icons: {
    marginLeft: 20,
  },
  profileEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
});

export default EditProfile;
