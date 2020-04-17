import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import * as Icons from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LikeBtn, KomenBtn } from './LikeBtn';
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
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.wraperImg, flex: 0.6 }}>
        <Image style={styles.image} source={{ uri: images }} />
        <Text style={styles.title}>{title}</Text>
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
              <Text style={styles.teks}>{like} Likes</Text>
            </View>
            <TouchableOpacity onPress={pressKomen}>
              <View style={{ ...styles.row, ...styles.center }}>
                <KomenBtn />
                <Text style={styles.teks}>{comment} comments</Text>
              </View>
            </TouchableOpacity>
            <View>
              <Text>2 jam lalu</Text>
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
});

export default CardSream;
