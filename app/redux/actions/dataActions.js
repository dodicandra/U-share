import axios from 'axios';
import { SET_STREAM, LOADING_DATA, SET_STREAMS } from '../reducer/dataReducer';

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
