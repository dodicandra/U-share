import React, { useEffect, useState, useMemo } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import AddStream from '../components/AddStream';
import CardSream from '../components/CardSream';
import Modal from '../components/Modal';
import {
  getStreams,
  postAction,
  getStream,
} from '../redux/actions/dataActions';

const { width } = Dimensions.get('screen');

const Home = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [post, setPost] = useState('');
  const dataR = useSelector((state) => state.data);
  const UI = useSelector((state) => state.UI);
  const dispatch = useDispatch();
  const submitStream = async () => {
    const data = {
      body: post,
    };

    await dispatch(postAction(data));
    setShow(false);
  };

  useEffect(() => {
    dispatch(getStreams());

    return getStreams;
  }, []);

  const renderCard = ({ item }) => (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
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
        createAt={item.createAt}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {dataR.loading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <View style={{ flex: 1 }}>
          <AddStream onPress={() => setShow(true)} style={styles.Add} />
          <Modal isVisible={show} onBackdropPress={() => setShow(false)}>
            <>
              <Input
                onChangeText={(teks) => setPost(teks)}
                style={{ marginBottom: 20 }}
                multiline={true}
                placeholder="Ceritakan sesuatu..."
              />
              <View style={{ height: 30 }} />
              <Button
                title="SUBMIT"
                loading={UI.loading}
                disabled={UI.loading}
                loadingProps={{ ...ActivityIndicator, color: 'red' }}
                onPress={submitStream}
              />
            </>
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
