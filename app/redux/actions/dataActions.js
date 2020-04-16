import axios from 'axios';
import { SET_STREAM, LOADING_DATA, SET_STREAMS } from '../reducer/dataReducer';
import { LOADING_UI, STOP_LOADING_UI } from '../reducer/uiReducer';

export const getStreams = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_DATA });
    const respon = await axios.get('/stream');
    const res = await respon.data;
    dispatch({ type: SET_STREAMS, payload: res });
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: SET_STREAMS, payload: [] });
  }
};

export const getStream = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_UI });
    const response = await axios.get(`/stream/${id}`);
    const res = await response.data;
    dispatch({ type: SET_STREAM, payload: res });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: SET_STREAM, payload: [] });
  }
};
