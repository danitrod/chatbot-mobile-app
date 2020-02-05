import * as actionTypes from './actionTypes';

export const changeCredentialsWatson = (newCredentials) => {
    return {
        type: actionTypes.CHANGE_CREDENTIALS_WA,
        newCredentials
    };
};

export const changeCredentialsOrchestrator = (newCredentials) => {
    return {
        type: actionTypes.CHANGE_CREDENTIALS_OR,
        newCredentials
    };
};
