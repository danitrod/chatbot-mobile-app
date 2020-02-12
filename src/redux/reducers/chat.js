import * as actionTypes from '../actions/actionTypes';

const initialState = {
    history: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_MESSAGE:
            return {
                history: state.history.concat(action.message)
            };
        case actionTypes.REFRESH:
            return {
                history: []
            };
        default:
            return state;
    };
};

export default reducer;
