export const LOADING_UI = 'LOADING_UI';
export const STOP_LOADING_UI = 'STOP_LOADING_UI';
export const SET_ERROR_UI = 'SET_ERROR_UI';
export const CLEAR_ERROR_UI = 'CLEAR_ERROR_UI';

const initialState = {
  loading: false,
  errors: null,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    case SET_ERROR_UI:
      return {
        ...state,
        loading: false,
        errors: {
          email: action.payload.email,
          password: action.payload.password,
          message: action.payload.General,
        },
      };
    case CLEAR_ERROR_UI:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    default:
      return state;
  }
};
