import React from 'react';
import axios from 'axios';
import RootStack from './app/router/RootStack';

axios.defaults.baseURL =
  'https://us-central1-appsfirebase-cekidot.cloudfunctions.net/api';

export default function App() {
  return <RootStack />;
}
