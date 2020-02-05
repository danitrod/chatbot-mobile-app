import * as actionTypes from './actionTypes';

export const add = (message) => {
    console.log('action called');
    return {
        type: actionTypes.ADD_MESSAGE,
        message
    };
};

export const refresh = () => {
    return {
        type: actionTypes.REFRESH
    };
};
