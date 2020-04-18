import * as Icons from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import CardSream from '../components/CardSream';
import { getStream, komenSBT } from '../redux/actions/dataActions';

const { width } = Dimensions.get('screen');

const Komen = ({ route, navigation }) => {
  const { streamId, userImage, body } = route.params;
  const [koment, setKoment] = useState('');
  const dataR = useSelector((state) => state.data);
  const UI = useSelector((state) => state.UI);
  const auth = useSelector((state) => state.user);
  const { stream } = dataR;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStream(streamId));
  }, []);

  const komenItem = ({ item }) => (
    <View style={styles.komenContainer}>
      <View>
        <Image source={{ uri: item.userImage }} style={styles.imgKomen} />
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontWeight: 'bold', letterSpacing: 2 }}>
          {item.userHandle}
        </Text>
        <Text>{item.body}</Text>
      </View>
    </View>
  );

  const submitKomen = () => {
    const data = {
      body: koment,
    };

    if (auth.autentikasi !== null) {
      dispatch(komenSBT(streamId, data));
    } else {
      navigation.navigate('Profile');
    }
  };

  return (
    <View style={styles.container}>
      <CardSream
        images={userImage}
        title={stream.userHandle}
        disabled={true}
        body={body}
      />
      {UI.loading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={10}
            data={stream.komen}
            renderItem={komenItem}
            keyExtractor={(item) => item.createAt}
          />
          <View style={styles.inputWraper}>
            <TextInput
              multiline={true}
              style={styles.input}
              placeholder="Lo mau ngomong apa ?..."
              onChangeText={(teks) => setKoment(teks)}
            />
            <TouchableOpacity onPress={submitKomen}>
              <Icons.FontAwesome style={styles.icons} name="send" size={25} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  komenContainer: {
    flexDirection: 'row',
    width: width - 10,
    height: 50,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#acacac',
    display: 'flex',
  },
  imgKomen: { width: 30, height: 30, borderRadius: 100 },
  icons: {
    marginRight: 20,
  },
  inputWraper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
  },
  input: {
    fontSize: 18,
    padding: 4,
    width: '80%',
    display: 'flex',
  },
});

export default Komen;
