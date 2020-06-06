export const SET_USER = 'SET_USER';
export const SET_AUTH = 'SET_AUTH';
export const SET_UNAUTH = 'SET_UNAUTH';
export const LOADING_USER = 'LOADING_USER';
export const STOP_LOADING_USER = 'STOP_LOADING_USER';
export const LIKE_STREAM = 'LIKE_STREAM';
export const UNLIKE_STREAM = 'UNLIKE_STREAM';
export const MARK_NOTIF = 'MARK_NOTIF';

const initialState = {
  autentikasi: null,
  credentials: {},
  loading: false,
  likes: [],
  notifikasi: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        autentikasi: action.payload,
        loading: false,
      };
    case SET_UNAUTH:
      return initialState;
    case SET_USER:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_USER:
      return {
        ...state,
        loading: false,
      };
    case SET_USER:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case LIKE_STREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            streamId: action.payload.streamId,
          },
        ],
      };
    case UNLIKE_STREAM:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.streamId !== action.payload.streamId
        ),
      };
    case MARK_NOTIF:
      state.notifikasi.forEach((not) => not.read == true);
      return { ...state };
    default:
      return state;
  }
};
