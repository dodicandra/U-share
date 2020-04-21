import * as Icons from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { Avatar, Button, Input, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { editPicAction, editUserAction } from '../redux/actions/userActions';

const EditProfile = ({ route }) => {
  const { imageUrl, bio, website, location } = route.params;
  const navigation = useNavigation();

  const [imagedata, setImageData] = useState('');

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
        await formData(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formData = async (photo) => {
    const part = photo.uri.split('/');
    const fileName = part[part.length - 1];
    const filetype = fileName.split('.');
    const type = filetype[filetype.length - 1];

    console.log('fileName', fileName);
    console.log('type', type);

    let data = new FormData();
    data.append('image', {
      name: fileName,
      type: `image/png/${type}`,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
    });

    await postImage(data);
  };

  const postImage = async (data) => {
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
              TouchableComponent={TouchableOpacity}
              type="outline"
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
