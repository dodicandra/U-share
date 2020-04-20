import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';

const Notifikasi = () => {
  const user = useSelector((state) => state.user);
  const listItems = ({ item }) => (
    <ListItem
      title={item.sender}
      bottomDivider
      subtitle={
        item.type === 'komen'
          ? 'telah Mengomentari post anda'
          : 'telah Menyukai post anda'
      }
    />
  );

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={10}
        data={user.notifikasi}
        renderItem={listItems}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Notifikasi;
