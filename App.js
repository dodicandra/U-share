import React from 'react';
import Home from './app/screen/Home';
import axios from 'axios';

axios.defaults.baseURL =
  'https://us-central1-appsfirebase-cekidot.cloudfunctions.net/api';

export default function App() {
  return <Home />;
}
