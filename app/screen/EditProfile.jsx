import * as Icons from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Avatar, Button, Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { editPicAction, editUserAction } from '../redux/actions/userActions';

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
        let pathName = res.uri.split('/');
        let fileName = pathName[pathName.length - 1];
        let newData = {
          uri: res.uri,
          type: `image/png`,
          name: fileName,
        };

        await formData(newData);
        navigation.navigate('Profiles');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formData = async (photo) => {
    let data = new FormData();
    data.append('image', photo);

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
          website: website && website.substring(8),
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
              loading={user.loading}
              loadingProps={{ ...ActivityIndicator, color: 'red' }}
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
