import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Eyes from '../components/Eyes';

const { width } = Dimensions.get('screen');

const Register = () => {
  const [hiden, setHiden] = useState({ hides: true });

  const show = () => (
    <Eyes
      onPress={() =>
        setHiden({
          ...hiden,
          hides: !hiden.hides,
        })
      }
      eyeOpen={hiden.hides}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.inoutWraper}>
        <Input placeholder="Email" />
        <Input
          placeholder="Password"
          secureTextEntry={hiden.hides}
          rightIcon={show}
        />
        <Input placeholder="User Name" />
        <Button title="REGISTER" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inoutWraper: {
    width: width - 10,
    height: 350,
    justifyContent: 'space-evenly',
  },
});

export default Register;
