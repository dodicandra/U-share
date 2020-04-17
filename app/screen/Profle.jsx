import React, { useState, useRef } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import * as Icons from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../redux/actions/userActions';
import ProfileCom from '../components/ProfileCom';

const { width } = Dimensions.get('screen');

const Profle = () => {
  const auth = useSelector((state) => state.user);
  const UI = useSelector((state) => state.UI);
  const dispatch = useDispatch();

  const [hiden, setHiden] = useState({ hides: true });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const Eyes = () => (
    <TouchableOpacity
      onPress={() =>
        setHiden(() => ({
          ...hiden,
          hides: !hiden.hides,
        }))
      }
    >
      <Icons.Entypo name={!hiden.hides ? 'eye' : 'eye-with-line'} size={17} />
    </TouchableOpacity>
  );

  const handleLogin = () => {
    const data = {
      email: email,
      password: password,
    };

    dispatch(login(data));
    emailRef.current.clear();
    passwordRef.current.clear();
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWraper}>
        {auth.autentikasi !== null ? (
          <View>
            <ProfileCom />
            <Button
              disabled={UI.loading}
              loading={UI.loading}
              loadingProps={{ ...ActivityIndicator, color: 'red' }}
              title="LOGOUT"
              onPress={() => dispatch(logout())}
            />
          </View>
        ) : (
          <View style={styles.inputWraper}>
            {UI.errors && (
              <Text style={{ textAlign: 'center', color: 'red' }}>
                {UI.errors.message}
              </Text>
            )}
            <Input
              ref={emailRef}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(tek) => setEmail(tek)}
              placeholder="Email"
              errorMessage={UI.errors && UI.errors.email}
            />
            <Input
              ref={passwordRef}
              autoCapitalize="none"
              onChangeText={(tek) => setPassword(tek)}
              secureTextEntry={hiden.hides}
              placeholder="Password"
              rightIcon={Eyes}
              errorMessage={UI.errors && UI.errors.password}
            />
            <Button
              onPress={handleLogin}
              title="LOGIN"
              type="solid"
              loading={UI.loading}
              disabled={UI.loading}
              loadingProps={{
                ...ActivityIndicator,
                color: 'red',
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputWraper: {
    width: width - 10,
    height: 250,
    justifyContent: 'space-evenly',
  },
});

export default Profle;
