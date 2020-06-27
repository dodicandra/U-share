// @flow
import axios from 'axios';
import {
  SET_STREAM,
  LOADING_DATA,
  SET_STREAMS,
  SUBMIT_COMMEN,
  LIKE_STREAM,
  UNLIKE_STREAM,
  POST_STREAM,
  DELETE_STREAM,
  STOP_LOADING_DATA,
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
export const getStream = streamId => async (dispatch) => {
  try {
    dispatch({ type: LOADING_UI });
    const response = await axios.get(`/stream/${streamId}`);
    const res = await response.data;
    dispatch({ type: SET_STREAM, payload: res });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: SET_STREAM, payload: [] });
    dispatch({ type: STOP_LOADING_UI });
  }
};

export const getUserDataAction = userHandle => async (dispatch) => {
  try {
    dispatch({ type: LOADING_DATA });
    const req = await axios.get(`user/${userHandle}`);
    const res = await req.data;
    dispatch({ type: SET_STREAM, payload: res });
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: STOP_LOADING_DATA });
  }
};

export const komenSBT = (streamId, data) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_DATA });
    const response = await axios.post(`/stream/${streamId}/komen`, data);
    const res = await response.data;
    dispatch({ type: SUBMIT_COMMEN, payload: res });
    dispatch(getStream(res.streamId));
  } catch (error) {
    const err = error.response.data;
    console.log(err);
    dispatch({ type: SET_ERROR_UI, payload: err });
  }
};

export const likeAction = streamId => async (dispatch) => {
  try {
    const response = await axios.get(`/stream/${streamId}/like`);
    const res = await response.data;
    dispatch({ type: LIKE_STREAM, payload: res });
  } catch (error) {
    console.log(error);
    dispatch({ type: STOP_LOADING_UI });
  }
};

export const unlikeAction = streamId => async (dispatch) => {
  try {
    const response = await axios.get(`stream/${streamId}/unlike`);
    const res = await response.data;
    dispatch({ type: UNLIKE_STREAM, payload: res });
  } catch (error) {
    console.log(error);
  }
};

export const postAction = data => async (dispatch) => {
  try {
    dispatch({ type: LOADING_UI });
    const response = await axios.post('/stream', data);
    const res = await response.data;
    dispatch({ type: POST_STREAM, payload: res });
    dispatch({ type: STOP_LOADING_UI });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAction = streamId => async (dispatch) => {
  try {
    dispatch({ type: LOADING_UI });
    const response = await axios.delete(`/stream/${streamId}`);
    const res = await response.data;
    dispatch({ type: DELETE_STREAM, payload: res });
  } catch (err) {
    console.log(err);
  }
};
