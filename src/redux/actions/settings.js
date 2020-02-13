import * as actionTypes from './actionTypes';
import { refresh } from './index';
// import { createSession } from '../../services/assistant/conversation';

export const changeCredentials = (newCredentials) => {
    return async dispatch => {
        dispatch(changeCredentialsStarted());
        dispatch(setCredentials(newCredentials));
        dispatch(refresh());
    };
};

export const setCredentials = credentials => {
    return {
        type: actionTypes.SET_CREDENTIALS,
        credentials
    };
};

const changeCredentialsStarted = () => ({
    type: actionTypes.CHANGE_CREDENTIALS_STARTED
});
const changeCredentialsSuccess = newCredentials => ({
    type: actionTypes.CHANGE_CREDENTIALS_SUCCESS,
    newCredentials
});

const changeCredentialsFailure = error => ({
    type: actionTypes.CHANGE_CREDENTIALS_FAILURE,
    msg: error
});
