import * as Icons from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { ButtonGroup, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAction } from '../redux/actions/dataActions';
import { KomenBtn, LikeBtn } from './LikeBtn';
import { useNavigation } from '@react-navigation/native';
import Modal from './Modal';
import momen from 'moment';
const { width } = Dimensions.get('screen');

const CardSream = ({
  title,
  images,
  body,
  like,
  comment,
  pressKomen,
  disabled,
  streamId,
  createAt,
}) => {
  const auth = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    autentikasi,
    credentials: { handle },
  } = auth;
  const navigation = useNavigation();
  const [show, setShow] = useState(false);

  const deleteStream = async () => {
    await dispatch(deleteAction(streamId));
    setShow(false);
  };

  const deletBtn =
    autentikasi !== null && handle === title ? (
      <View style={styles.Trash}>
        <TouchableOpacity onPress={() => setShow(true)}>
          <Icons.Entypo name="trash" color="red" size={20} />
        </TouchableOpacity>
      </View>
    ) : null;

  const BTN1 = () => (
    <Text onPress={() => setShow(false)} h4>
      cancel
    </Text>
  );
  const BTN2 = () => (
    <Text onPress={deleteStream} h4>
      delete
    </Text>
  );
  const buttons = [{ element: BTN1 }, { element: BTN2 }];
  const toUserData = () => {
    navigation.navigate('UserData', { title });
  };
  return (
    <View style={styles.container}>
      <View style={{ ...styles.wraperImg, flex: 0.6 }}>
        <Image style={styles.image} source={{ uri: images }} />
        <Text onPress={toUserData} style={styles.title}>
          {title}
        </Text>
        {deletBtn}
        <Modal isVisible={show} onBackdropPress={() => setShow(false)}>
          <ButtonGroup buttons={buttons} containerStyle={{ height: 50 }} />
        </Modal>
      </View>
      <ScrollView style={styles.bodyWraper}>
        <Text style={styles.teksBody}>{body}</Text>
      </ScrollView>
      <View style={styles.wraperIcon}>
        {disabled ? (
          <View />
        ) : (
          <View style={styles.wraperLike}>
            <View style={{ ...styles.row, ...styles.center }}>
              <LikeBtn navigation={navigation} streamId={streamId} />
              <Text style={styles.teks}>{like} Suka</Text>
            </View>
            <TouchableOpacity onPress={pressKomen}>
              <View style={{ ...styles.row, ...styles.center }}>
                <KomenBtn />
                <Text style={styles.teks}>{comment} Komen</Text>
              </View>
            </TouchableOpacity>
            <View>
              <Text style={{ color: '#acacac' }}>
                {momen(createAt).format('DD-MM-YYYY')}
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 30,
    height: 250,
    backgroundColor: 'white',
    elevation: 6,
    padding: 5,
    borderRadius: 4,
    marginVertical: 10,
  },
  image: {
    width: 45,
    height: 45,
    marginLeft: 15,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 500,
  },
  wraperImg: {
    flexDirection: 'row',
    borderBottomColor: '#787877',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  wraperIcon: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
  },
  wraperBody: {
    backgroundColor: 'red',
  },
  wraperLike: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    overflow: 'hidden',
  },
  teks: {
    marginLeft: 6,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  bodyWraper: {
    flex: 2,
    marginTop: 10,
    display: 'flex',
    overflow: 'hidden',
  },
  teksBody: {
    fontWeight: '500',
    letterSpacing: 2,
    fontSize: 22,
  },
  Trash: {
    position: 'absolute',
    right: 2,
    bottom: 4,
  },
});

export default CardSream;
