import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { CLEAR_ERROR_UI, SET_ERROR_UI } from '../reducer/uiReducer';
import {
  LOADING_USER,
  MARK_NOTIF,
  SET_AUTH,
  SET_UNAUTH,
  SET_USER,
  STOP_LOADING_USER,
} from '../reducer/userReducer';

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

export const markNotifikasiAction = (data) => async (dispatch) => {
  try {
    const response = await axios.post('/notifikasi', data);
    const res = await response.data;
    dispatch({ type: MARK_NOTIF });
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const editPicAction = (formData) => async (dispatch) => {
  try {
    console.log('ACTION', formData);
    dispatch({ type: LOADING_USER });
    const response = await axios.post('/user/image', formData);
    const res = await response.data;
    dispatch(getUser());
    console.log('KALO SUKSES', res);
    // return res;
  } catch (error) {
    console.log('ERROR', error);
    dispatch({ type: STOP_LOADING_USER });
  }
};

export const editUserAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_USER });
    const response = await axios.post('/user', data);
    const res = await response.data;
    dispatch({ type: STOP_LOADING_USER });
    dispatch(getUser());
  } catch (error) {
    console.log(error);
    dispatch({ type: STOP_LOADING_USER });
  }
};

// const showAlert = (navigation) =>
//   Alert.alert(
//     'Register success',
//     [{ text: 'OK', onPress: () => navigation.navigate('Profiles') }],
//     { cancelable: false }
//   );
