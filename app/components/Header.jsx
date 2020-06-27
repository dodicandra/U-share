// @flow
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';
import * as Icons from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const Header = ({ onPress }) => {
  const user = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>
        U-Share
      </Text>
      <View style={{ position: 'absolute', right: 30 }}>
        <TouchableOpacity onPres={onPress}>
          <Icons.MaterialCommunityIcons name="bell" size={22} />
          {user.notifikasi && user.notifikasi.length > 0 && (
            <Badge
              status="error"
              containerStyle={{ position: 'absolute', right: -12 }}
              value={user.notifikasi && user.notifikasi.length}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
});

export default Header;
