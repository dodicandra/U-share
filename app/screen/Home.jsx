import React, { useEffect, useState, useReducer } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import CardSream from '../components/CardSream';
import { useDispatch, useSelector } from 'react-redux';
import { getStreams } from '../redux/actions/dataActions';

const Home = ({ navigation }) => {
  const dataR = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStreams());
  }, []);

  const renderCard = ({ item }) => (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
      <StatusBar hidden />
      <CardSream
        title={item.userHandle}
        comment={item.komenCount}
        like={item.likeCount}
        body={item.body}
        images={item.userImage}
        pressKomen={() => navigation.navigate('Komens', item)}
        disabled={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {dataR.loading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <FlatList
          maxToRenderPerBatch={10}
          centerContent={true}
          showsVerticalScrollIndicator={false}
          data={dataR.streams}
          renderItem={renderCard}
          keyExtractor={(item) => item.streamId}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 0,
  },
});

export default Home;
