import React, { useEffect } from 'react';
import axios from 'axios';
import { Provider, useDispatch } from 'react-redux';
import RootStack from './app/router/RootStack';
import { store } from './app/redux/store';
import { AsyncStorage } from 'react-native';
import { SET_AUTH } from './app/redux/reducer/userReducer';

axios.defaults.baseURL =
  'https://us-central1-appsfirebase-cekidot.cloudfunctions.net/api';

export default function App() {
  // const dispatch = useDispatch();

  const getToken = async () => {
    try {
      token = await AsyncStorage.getItem('token');
      store.dispatch({ type: SET_AUTH, payload: token });
      axios.defaults.headers.common['Authorization'] = token;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
}
