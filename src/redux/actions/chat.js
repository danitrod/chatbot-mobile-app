import * as actionTypes from './actionTypes';

export const add = (message) => {
    return (dispatch) => {
        // async code
        dispatch({
            type: actionTypes.ADD_MESSAGE,
            message
        });
    };
};

export const refresh = () => {
    return (dispatch) => {
        dispatch({
            type: actionTypes.REFRESH
        });
    };
};
