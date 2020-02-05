import * as actionTypes from '../actions/actionTypes';

const initialState = {
    credentials: {
        type: 'WA',
        value: {
            apikey: '',
            assistantId: ''
        }
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_CREDENTIALS_WA:
            return {
                type: 'WA',
                value: action.newCredentials
            };
        case actionTypes.CHANGE_CREDENTIALS_OR:
            return {
                type: 'OR',
                value: action.newCredentials
            };
        default:
            return state;
    };
};

export default reducer;
