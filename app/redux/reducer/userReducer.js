export const SET_USER = 'SET_USER';
export const SET_AUTH = 'SET_AUTH';
export const SET_UNAUTH = 'SET_UNAUTH';
export const LOADING_USER = 'LOADING_USER';
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
      };
    case SET_UNAUTH:
      return initialState;
    case SET_USER:
      return {
        autentikasi: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
