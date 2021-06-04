import {combineReducers} from 'redux';

import authReducer from './authReducer';

const rootReducer = combineReducers({
  authReducerFeed: authReducer,
});

const rootReducerState = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    state.authReducerFeed = {};
  }

  return rootReducer(state, action);
};

export default rootReducerState;
