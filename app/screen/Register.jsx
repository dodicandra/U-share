// @flow
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import Eyes from '../components/Eyes';
import { registerAction } from '../redux/actions/userActions';

const { width } = Dimensions.get('screen');

const Register = () => {
  const [hiden, setHiden] = useState({ hides: true });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [konfirPass, setKomfirPass] = useState('');
  const [name, setName] = useState('');

  const UI = useSelector(state => state.UI);
  const auth = useSelector(state => state.user);
  const dispatch = useDispatch();

  const shoAlert = useCallback(() => {
    Alert.alert('Register sukses,silahkan Login');
  });

  const show = () => (
    <Eyes
      onPress={() => {
        setHiden({
          ...hiden,
          hides: !hiden.hides,
        });
      }}
      eyeOpen={hiden.hides}
    />
  );

  const handleRegister = async () => {
    const data = {
      email,
      password,
      confirmPassword: konfirPass,
      handle: name,
    };
    await dispatch(registerAction(data, shoAlert));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inoutWraper}>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={teks => setEmail(teks)}
          errorMessage={UI.errors && UI.errors.email}
        />
        <Input
          placeholder="Password"
          secureTextEntry={hiden.hides}
          rightIcon={show}
          onChangeText={teks => setPassword(teks)}
          errorMessage={UI.errors && UI.errors.password}
        />
        <Input
          placeholder="Ulangi Password"
          secureTextEntry={hiden.hides}
          rightIcon={show}
          onChangeText={teks => setKomfirPass(teks)}
          errorMessage={UI.errors && UI.errors.confirmPassword}
        />
        <Input
          placeholder="User Name"
          onChangeText={teks => setName(teks)}
          errorMessage={UI.errors && UI.errors.handle}
        />
        <Button
          onPress={handleRegister}
          title="REGISTER"
          loading={auth.loading}
          disabled={auth.loading}
          loadingProps={{ ...ActivityIndicator, color: 'red' }}
        />
        {/* <Btn title="alert" onPress={shoAlert} /> */}
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
