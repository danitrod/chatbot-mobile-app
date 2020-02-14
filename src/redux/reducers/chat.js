import * as actionTypes from '../actions/actionTypes';

const initialState = {
    history: [],
    err: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_MESSAGE_SUCCESS:
            return { history: state.history.concat(action.message), err: false };
        case actionTypes.ADD_MESSAGE_FAILURE:
            console.error('Error sending message:', action.msg);
            return { ...state, err: true, msg: action.msg };
        case actionTypes.REFRESH_SUCCESS:
            return { history: action.message, err: false };
        case actionTypes.REFRESH_FAILURE:
            console.error('Error refreshing chat:', action.msg);
            return { ...state, err: true, msg: action.msg };
        case actionTypes.CLOSE_MODAL:
            return { ...state, err: false };
        default:
            return state;
    };
};

export default reducer;
