import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import CardSream from '../components/CardSream';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState();

  useEffect(() => {
    getData();
  });

  const renderCard = ({ item }) => (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <CardSream
        title={item.userHandle}
        comment={item.komenCount}
        like={item.likeCount}
        body={item.body}
        images={item.userImage}
      />
    </View>
  );

  const getData = async () => {
    try {
      const res = await axios.get('/stream');
      const result = await res.data;
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        maxToRenderPerBatch={10}
        centerContent={true}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderCard}
        keyExtractor={(item) => item.streamId}
      />
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
