import * as actionTypes from './actionTypes';

export const changeCredentials = (newCredentials) => {
    return {
        type: actionTypes.CHANGE_CREDENTIALS,
        newCredentials
    };
};
