import React, { useState, useCallback } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  Button as Btn,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import Eyes from '../components/Eyes';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../redux/actions/userActions';

const { width } = Dimensions.get('screen');

const Register = ({ navigation }) => {
  const [hiden, setHiden] = useState({ hides: true });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [konfirPass, setKomfirPass] = useState('');
  const [name, setName] = useState('');

  const UI = useSelector((state) => state.UI);
  const auth = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const shoAlert = useCallback(() =>
    Alert.alert('Register sukses,silahkan Login')
  );

  const clearForm = useCallback(() => {
    setEmail('');
    setPassword('');
    setName('');
  });

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

  const handleRegister = async () => {
    const data = {
      email: email,
      password: password,
      confirmPassword: konfirPass,
      handle: name,
    };
    await dispatch(registerAction(data, shoAlert));
    // shoAlert();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inoutWraper}>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(teks) => setEmail(teks)}
          errorMessage={UI.errors && UI.errors.email}
        />
        <Input
          placeholder="Password"
          secureTextEntry={hiden.hides}
          rightIcon={show}
          onChangeText={(teks) => setPassword(teks)}
          errorMessage={UI.errors && UI.errors.password}
        />
        <Input
          placeholder="Ulangi Password"
          secureTextEntry={hiden.hides}
          rightIcon={show}
          onChangeText={(teks) => setKomfirPass(teks)}
          errorMessage={UI.errors && UI.errors.confirmPassword}
        />
        <Input
          placeholder="User Name"
          onChangeText={(teks) => setName(teks)}
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
