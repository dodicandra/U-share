import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Overlay, Text, Input, Button } from 'react-native-elements';
import CardSream from '../components/CardSream';
import {
  getStreams,
  postAction,
  getStream,
} from '../redux/actions/dataActions';
import AddStream from '../components/AddStream';
import Modal from '../components/Modal';

const { width } = Dimensions.get('screen');

const Home = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [post, setPost] = useState('');
  const dataR = useSelector((state) => state.data);
  const UI = useSelector((state) => state.UI);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStreams());
    // dispatch(getStream(dataR.streams.streamId));
  }, []);

  const submitStream = async () => {
    const data = {
      body: post,
    };

    await dispatch(postAction(data));
    setShow(false);
  };

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
        streamId={item.streamId}
        navigation={navigation}
        userHandle={item.userHandle}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {dataR.loading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <View>
          <AddStream onPress={() => setShow(true)} style={styles.Add} />
          <Modal isVisible={show} onBackdropPress={() => setShow(false)}>
            <Input
              onChangeText={(teks) => setPost(teks)}
              style={{ marginBottom: 20 }}
              multiline={true}
              placeholder="Ceritakan apa yang terjadi.."
            />
            <View style={{ height: 30 }} />
            <Button
              title="SUBMIT"
              loading={UI.loading}
              disabled={UI.loading}
              loadingProps={{ ...ActivityIndicator, color: 'red' }}
              onPress={submitStream}
            />
          </Modal>

          <FlatList
            maxToRenderPerBatch={10}
            centerContent={true}
            showsVerticalScrollIndicator={false}
            data={dataR.streams}
            renderItem={renderCard}
            keyExtractor={(item) => item.streamId}
          />
        </View>
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
  Add: {
    position: 'absolute',
    right: 3,
    top: 3,
    zIndex: 99999,
  },
});

export default Home;
