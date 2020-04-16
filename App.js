import React from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import RootStack from './app/router/RootStack';
import { store } from './app/redux/store';

axios.defaults.baseURL =
  'https://us-central1-appsfirebase-cekidot.cloudfunctions.net/api';

export default function App() {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
}
