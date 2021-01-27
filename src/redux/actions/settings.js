import * as actionTypes from './actionTypes';
import { refresh } from './index';

// Change credentials: sets new credentials and calls refresh, which clears chat history, adds first message and sets sessionId
export const changeCredentials = (newCredentials) => {
  return (dispatch) => {
    dispatch(setCredentials(newCredentials));
    dispatch(refresh());
  };
};

// Set credentials: sets state credentials
export const setCredentials = (credentials) => {
  return {
    type: actionTypes.SET_CREDENTIALS,
    credentials
  };
};
