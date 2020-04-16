import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { uiReducer } from './reducer/uiReducer';
import { dataReducer } from './reducer/dataReducer';
import { userReducer } from './reducer/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
});

// const midleWare = [thunk];

export const store = createStore(rootReducer, applyMiddleware(thunk));
