// @flow
import * as Icons from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Badge } from 'react-native-elements';
import { useSelector } from 'react-redux';

const NotifikasiBadge = () => {
  const user = useSelector(state => state.user);
  const { notifikasi } = user;
  const navigation = useNavigation();
  const Notif = ({ value }) => (
    <Badge
      status="error"
      containerStyle={{ position: 'absolute', right: -12 }}
      value={value}
    />
  );
  let IconNotifikasi;
  if (notifikasi && notifikasi.length > 0) {
    notifikasi.filter(not => not.read === false).length > 0
      ? (IconNotifikasi = (
          <Notif
            value={
              notifikasi && notifikasi.filter(not => not.read === false).length
            }
          />
        ))
      : (IconNotifikasi = null);
  } else {
    IconNotifikasi = null;
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.navigate('Notifikasi')}>
        <Icons.MaterialCommunityIcons name="bell" size={22} />
        {IconNotifikasi}
      </TouchableOpacity>
    </View>
  );
};

export default NotifikasiBadge;
