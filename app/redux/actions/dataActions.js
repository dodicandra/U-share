import axios from 'axios';
import {
  SET_STREAM,
  LOADING_DATA,
  SET_STREAMS,
  SUBMIT_COMMEN,
  LIKE_STREAM,
  UNLIKE_STREAM,
} from '../reducer/dataReducer';
import {
  LOADING_UI,
  STOP_LOADING_UI,
  SET_ERROR_UI,
} from '../reducer/uiReducer';

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

// singel
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

export const komenSBT = (streamId, data) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_UI });
    const response = await axios.post(`/stream/${streamId}/komen`, data);
    const res = await response.data;
    dispatch({ type: SUBMIT_COMMEN, payload: res });
    dispatch(getStreams());
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    const err = error.response.data;
    console.log(err);
    dispatch({ type: SET_ERROR_UI, payload: err });
  }
};

export const likeAction = (streamId) => async (dispatch) => {
  try {
    const response = await axios.get(`/stream/${streamId}/like`);
    const res = await response.data;
    dispatch({ type: LIKE_STREAM, payload: res });
  } catch (error) {
    console.log(error);
    dispatch({ type: STOP_LOADING_UI });
  }
};

export const unlikeAction = (streamId) => async (dispatch) => {
  try {
    const response = await axios.get(`stream/${streamId}/unlike`);
    const res = await response.data;
    dispatch({ type: UNLIKE_STREAM, payload: res });
  } catch (error) {
    console.log(error);
  }
};
