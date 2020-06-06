import * as Icons from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Avatar, Divider, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/actions/userActions';

const { width } = Dimensions.get('screen');

const ProfileCom = () => {
  const auth = useSelector((state) => state.user);
  const UI = useSelector((state) => state.UI);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getUserData = () => {
    dispatch(getUser());
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{UI.errors && UI.errors.error}</Text>
      <View style={styles.wraperContainer}>
        <Avatar
          containerStyle={styles.avaContainer}
          source={{ uri: auth.credentials.imageUrl }}
          size="xlarge"
          rounded={true}
          showEditButton={true}
          title={
            auth.credentials.handle && auth.credentials.handle.substring(0, 2)
          }
          onEditPress={() =>
            navigation.navigate('EditProfile', auth.credentials)
          }
        />
        <View
          style={{
            width: 300,
            display: 'flex',
          }}
        >
          <Text
            h4
            h4Style={{
              letterSpacing: 3,
              textAlign: 'center',
              ...styles.textMargin,
            }}
          >
            {auth.credentials.handle}
          </Text>
          <Divider style={{ backgroundColor: '#acacac' }} />
          <Text style={{ textAlign: 'center', ...styles.textMargin }}>
            <Icons.Entypo name="location" size={20} />{' '}
            {auth.credentials.location}
          </Text>
          <Divider style={{ backgroundColor: '#acacac' }} />
          <View style={styles.wraperBio}>
            <Icons.Foundation name="clipboard-notes" size={20} />
            <Text style={styles.bio}>{auth.credentials.bio}</Text>
          </View>
          <Divider style={{ backgroundColor: '#acacac' }} />
          <Text style={{ textAlign: 'center', ...styles.textMargin }}>
            <Icons.Feather name="chrome" size={20} /> {auth.credentials.website}
          </Text>
          <Divider style={{ backgroundColor: '#acacac' }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  wraperContainer: {
    elevation: 3,
    width: width - 10,
    height: '90%',
    alignItems: 'center',
    borderRadius: 4,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  avaContainer: {
    position: 'relative',
    marginTop: -40,
    elevation: 3,
    borderWidth: 3,
    borderColor: '#acacac',
  },
  textMargin: {
    marginVertical: 7,
  },
  bio: {
    width: '60%',
    display: 'flex',
    marginLeft: 10,
  },
  wraperBio: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  icons: {
    marginRight: 40,
  },
});

export default ProfileCom;
