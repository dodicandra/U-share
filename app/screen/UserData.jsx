// @flow
import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import { Text, Card, Avatar } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import { getUserDataAction } from '../redux/actions/dataActions';
import CardSream from '../components/CardSream';

const { width } = Dimensions.get('screen');

const UserData = ({ navigation }) => {
  const route = useRoute();
  const { title } = route.params;

  const data = useSelector(state => state.data);
  const { stream, user } = data.stream;
  const dispatch = useDispatch();

  const getDataUser = async () => {
    await dispatch(getUserDataAction(title));
  };

  useEffect(() => {
    getDataUser();
  }, []);

  const streamItem = ({ item }) => (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
      <CardSream
        images={item.userImage}
        title={item.userHandle}
        body={item.body}
        like={item.likeCount}
        comment={item.komenCount}
        createAt={item.createAt}
        pressKomen={() => navigation.navigate('Komens', item)}
        streamId={item.streamId}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {data.loading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Card containerStyle={{ alignItems: 'center', width: width - 20 }}>
            <Avatar
              source={{ uri: user && user.imageUrl }}
              size="xlarge"
              rounded
              containerStyle={{ borderWidth: 4, borderColor: '#acacac' }}
              title={user && user.handle.substring(0, 2)}
            />
            <Text h4 style={styles.teksContainer}>
              {user && user.handle}
            </Text>
            <Text style={styles.createAt}>
              Sejak
              {' '}
              {moment(user && user.createAt).format('DD-MMMM YYYY')}
            </Text>
          </Card>
          <FlatList
            data={stream}
            keyExtractor={(item, index) => index.toString()}
            renderItem={streamItem}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  teksContainer: { letterSpacing: 2, textAlign: 'center', marginTop: 15 },
  createAt: { letterSpacing: 2, color: '#acacac', textAlign: 'center' },
});

export default UserData;
