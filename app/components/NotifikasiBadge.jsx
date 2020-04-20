import React from 'react';
import { Badge } from 'react-native-elements';
import * as Icons from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const NotifikasiBadge = () => {
  const user = useSelector((state) => state.user);
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
    notifikasi.filter((not) => not.read === false).length > 0
      ? (IconNotifikasi = (
          <Notif
            value={
              notifikasi &&
              notifikasi.filter((not) => not.read === false).length
            }
          />
        ))
      : (IconNotifikasi = null);
  } else {
    IconNotifikasi = null;
  }

  return (
    <TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Notifikasi')}>
        <Icons.MaterialCommunityIcons name="bell" size={22} />
        {IconNotifikasi}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default NotifikasiBadge;
/* 
<Badge
            status="error"
            containerStyle={{ position: 'absolute', right: -12 }}
            value={user.notifikasi && user.notifikasi.length}
          />
*/
