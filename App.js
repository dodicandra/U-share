import axios from 'axios';
import React, { useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { SET_AUTH } from './app/redux/reducer/userReducer';
import { store } from './app/redux/store';
import RootStack from './app/router/RootStack';

axios.defaults.baseURL =
  'https://us-central1-appsfirebase-cekidot.cloudfunctions.net/api';

export default function App() {
  // const dispatch = useDispatch();

  const getToken = async () => {
    try {
      token = await AsyncStorage.getItem('token');
      store.dispatch({ type: SET_AUTH, payload: token });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.log(error);
    }
  };

  const autorize = axios.defaults.headers['Authorization'];

  useEffect(() => {
    getToken();
    console.log('TOKEN', autorize);
  }, []);

  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
}
