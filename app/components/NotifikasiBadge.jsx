import React from 'react';
import { Badge } from 'react-native-elements';
import * as Icons from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const NotifikasiBadge = () => {
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();

  return (
    <TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Notifikasi')}>
        <Icons.MaterialCommunityIcons name="bell" size={22} />
        {user.notifikasi && user.notifikasi.length > 0 && (
          <Badge
            status="error"
            containerStyle={{ position: 'absolute', right: -12 }}
            value={user.notifikasi && user.notifikasi.length}
          />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default NotifikasiBadge;