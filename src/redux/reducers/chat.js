import * as actionTypes from '../actions/actionTypes';

const initialState = {
    history: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_MESSAGE_SUCCESS:
            return {
                history: state.history.concat(action.message)
            };
        case actionTypes.ADD_MESSAGE_FAILURE:
            console.error('Error sending message:', action.msg);
            return state;
        case actionTypes.REFRESH_SUCCESS:
            return {
                history: action.message
            };
        case actionTypes.REFRESH_FAILURE:
            console.error('Error refreshing chat:', action.msg);
            return state;
        default:
            return state;
    };
};

export default reducer;
