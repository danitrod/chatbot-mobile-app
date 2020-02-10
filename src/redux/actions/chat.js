import * as actionTypes from './actionTypes';

export const add = (message) => {
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
