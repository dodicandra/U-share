import { AdMobBanner } from 'expo-ads-admob';
import * as Device from 'expo-device';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text as Teks,
  View,
} from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Eyes from '../components/Eyes';
import ProfileCom from '../components/ProfileCom';
import { login, logout } from '../redux/actions/userActions';

const { width } = Dimensions.get('screen');
const deviceId = Device.osBuildId;

const Profle = ({ navigation }) => {
  const auth = useSelector((state) => state.user);
  const UI = useSelector((state) => state.UI);
  const dispatch = useDispatch();
  const [hiden, setHiden] = useState({ hides: true });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();
  const shown = () => (
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

  const handleLogin = async () => {
    const data = {
      email: email,
      password: password,
    };

    await dispatch(login(data));
    emailRef.current.clear();
    passwordRef.current.clear();
  };

  return (
    <View style={styles.container}>
      <View style={{ ...styles.inputWraper, height: 450 }}>
        {auth.autentikasi !== null ? (
          <>
            <View
              style={{
                display: 'flex',
                flex: 1,
                marginTop: 30,
              }}
            >
              <ProfileCom />
              <Button
                disabled={auth.loading}
                loading={auth.loading}
                loadingProps={{ ...ActivityIndicator, color: 'red' }}
                title="LOGOUT"
                onPress={() => dispatch(logout())}
              />
              <View style={{ position: 'absolute', bottom: -170 }}>
                <AdMobBanner
                  bannerSize="smartBannerLandscape"
                  adUnitID="ca-app-pub-8960982869518476/3907988403"
                  servePersonalizedAds={true}
                  testID={deviceId}
                />
              </View>
            </View>
          </>
        ) : (
          <View style={{ ...styles.inputWraper, height: 400 }}>
            {UI.errors && (
              <Text style={{ textAlign: 'center', color: 'red' }}>
                {UI.errors.General}
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
              rightIcon={shown}
              errorMessage={UI.errors && UI.errors.password}
            />
            <Button
              onPress={handleLogin}
              title="LOGIN"
              type="solid"
              loading={auth.loading}
              disabled={auth.loading}
              loadingProps={{
                ...ActivityIndicator,
                color: 'red',
              }}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Teks style={{ textAlign: 'center' }}>
                Belum Punya akun? Register Sekarang
              </Teks>
            </TouchableOpacity>
            <View style={{ position: 'absolute', bottom: -170 }}>
              <AdMobBanner
                bannerSize="smartBannerLandscape"
                adUnitID="ca-app-pub-8960982869518476/3907988403"
                testID={deviceId}
                servePersonalizedAds={true}
              />
            </View>
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
    display: 'flex',
    justifyContent: 'space-evenly',
  },
});

export default Profle;
