import axios from 'axios';
import React, { useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { SET_AUTH } from './app/redux/reducer/userReducer';
import { store } from './app/redux/store';
import jwtDecode from 'jwt-decode';
import RootStack from './app/router/RootStack';
import { logout } from './app/redux/actions/userActions';

axios.defaults.baseURL =
  'https://us-central1-appsfirebase-cekidot.cloudfunctions.net/api';

export default function App() {
  // const dispatch = useDispatch();

  const getToken = async () => {
    try {
      token = await AsyncStorage.getItem('token');

      if (token) {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          store.dispatch(logout());
        } else {
          store.dispatch({ type: SET_AUTH, payload: token });
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      }
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
