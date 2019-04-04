import axios from 'axios';

import { NETWORK_ERROR } from '../constants/action-types';

const SERVER_ERROR_MSG = 'We were unable to reach the server. Something might be wrong with us or it could be your internet connection!';
const SYSTEM_ERROR_MSG = 'We messed something up! We are working on it. Check back later.';

export const handleErrors = (dispatch, onErrorAction) => (error) => {
  console.log('----------------------------------------------------------');
  console.log(error);
  console.log('----------------------------------------------------------');
  // Check if the server was reachable
  if (error.response === undefined) {
    dispatch({ type: NETWORK_ERROR, payload: { error: SERVER_ERROR_MSG }, });
    return;
  }

  // Get the http status code for the error and dispatch the error
  const errMsg = error.response.data.data || error.response.data.reason || SYSTEM_ERROR_MSG;
  console.log('**********************************************************');
  console.log(errMsg);
  console.log('**********************************************************');

  if (typeof onErrorAction === 'function') onErrorAction(errMsg, error);
  else dispatch({ type: onErrorAction, payload: errMsg });
};
