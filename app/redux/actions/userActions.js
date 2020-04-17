import axios from 'axios';
import {
  LOADING_UI,
  STOP_LOADING_UI,
  SET_ERROR_UI,
  CLEAR_ERROR_UI,
} from '../reducer/uiReducer';
import { SET_AUTH, SET_UNAUTH } from '../reducer/userReducer';
import { AsyncStorage } from 'react-native';

export const login = (userData) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_UI });
    const response = await axios.post('/login', userData);
    const res = await response.data;
    await setOtorisasi(res.token);
    dispatch({ type: SET_AUTH });
    dispatch({ type: CLEAR_ERROR_UI });
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: SET_ERROR_UI, payload: error.response.data });
    dispatch({ type: STOP_LOADING_UI });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_UI });
    await AsyncStorage.removeItem('token');
    delete axios.defaults.headers['Authorization'];
    dispatch({ type: SET_UNAUTH });
    dispatch({ type: CLEAR_ERROR_UI });
  } catch (error) {
    console.log(error);
    dispatch({ type: SET_ERROR_UI, payload: error.response.data });
    dispatch({ type: STOP_LOADING_UI });
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
