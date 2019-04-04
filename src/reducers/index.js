import { combineReducers } from 'redux';

import { PURGE_STORE } from 'constants/action-types';

import model from './model';

const rootReducer = combineReducers({
  model,
});

export default (state, action) => rootReducer(state, action);
