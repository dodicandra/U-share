export const SET_STREAMS = 'SET_STREAMS';
export const SET_STREAM = 'SET_STREAM';
export const LIKE_STREAM = 'LIKE_STREAM';
export const UNLIKE_STREAM = 'UNLIKE_STREAM';
export const LOADING_DATA = 'LOADING_DATA';
export const DELETE_STREAM = 'DELETE_STREAM';
export const POST_STREAM = 'POST_STREAM';
export const SUBMIT_COMMEN = 'SUBMIT_COMMEN';

const initialState = {
  streams: [],
  stream: {},
  loading: false,
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_STREAMS:
      return {
        ...state,
        streams: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
