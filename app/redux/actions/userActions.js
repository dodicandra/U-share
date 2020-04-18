import axios from 'axios';
import {
  LOADING_UI,
  STOP_LOADING_UI,
  SET_ERROR_UI,
  CLEAR_ERROR_UI,
} from '../reducer/uiReducer';
import {
  SET_AUTH,
  SET_UNAUTH,
  LOADING_USER,
  SET_USER,
  STOP_LOADING_USER,
} from '../reducer/userReducer';
import { AsyncStorage, Alert } from 'react-native';

export const login = (userData) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_USER });
    const response = await axios.post('/login', userData);
    const res = await response.data;
    await setOtorisasi(res.token);
    dispatch({ type: SET_AUTH, payload: res.token });
    dispatch({ type: CLEAR_ERROR_UI });
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: SET_ERROR_UI, payload: error.response.data });
    dispatch({ type: STOP_LOADING_USER });
  }
};

export const registerAction = (data, showAlert) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_USER });
    const response = await axios.post('/singup', data);
    const res = await response.data;
    dispatch({ type: CLEAR_ERROR_UI });
    dispatch({ type: STOP_LOADING_USER });
    showAlert();
    console.log(res);
    return res;
  } catch (err) {
    console.log(err.response.data);
    dispatch({ type: SET_ERROR_UI, payload: err.response.data });
    dispatch({ type: STOP_LOADING_USER });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_USER });
    await AsyncStorage.removeItem('token');
    delete axios.defaults.headers['Authorization'];
    dispatch({ type: SET_UNAUTH });
    dispatch({ type: CLEAR_ERROR_UI });
  } catch (error) {
    console.log(error);
    dispatch({ type: SET_ERROR_UI, payload: error.response.data });
    dispatch({ type: STOP_LOADING_USER });
  }
};

export const getUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_USER });
    const response = await axios.get('/user');
    const res = await response.data;
    dispatch({ type: SET_USER, payload: res });
  } catch (error) {
    dispatch({ type: SET_ERROR_UI, payload: error.response.data });
    dispatch({ type: STOP_LOADING_USER });
  }
};

const setOtorisasi = async (token) => {
  try {
    const TOKEN = `Bearer ${token}`;
    await AsyncStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = TOKEN;
  } catch (error) {
    console.log(error);
  }
};

// const showAlert = (navigation) =>
//   Alert.alert(
//     'Register success',
//     [{ text: 'OK', onPress: () => navigation.navigate('Profiles') }],
//     { cancelable: false }
//   );
