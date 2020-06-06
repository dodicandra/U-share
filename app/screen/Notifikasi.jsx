import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { markNotifikasiAction } from '../redux/actions/userActions';
import moment from 'moment';

const Notifikasi = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onOpen = () => {
    const unRead = user.notifikasi
      .filter((not) => !not.read)
      .map((not) => not.notifikasiId);
    dispatch(markNotifikasiAction(unRead));
  };

  const listItems = ({ item }) => (
    <ListItem
      title={item.sender}
      titleStyle={{ fontWeight: 'bold' }}
      bottomDivider
      subtitle={
        <View style={{ flexDirection: 'row' }}>
          {item.type === 'like' ? (
            <Text>Telah Menyukai post anda</Text>
          ) : (
            <Text>Telah Mengomentari post anda</Text>
          )}
          <Text style={{ marginLeft: 20, color: '#acacac' }}>
            {moment(item.createAt).fromNow()}
          </Text>
        </View>
      }
    />
  );

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      {user.notifikasi && user.notifikasi.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={10}
          data={user.notifikasi}
          renderItem={listItems}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.teks}>Tidak ada notifikasi</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  teks: {
    textAlign: 'center',
    marginTop: 20,
    color: '#acacac',
  },
});

export default Notifikasi;
