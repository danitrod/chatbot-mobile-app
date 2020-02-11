import * as actionTypes from '../actions/actionTypes';

const initialState = {
    credentials: {
        name: 'My Assistant',
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
                name: action.newCredentials.name,
                type: 'WA',
                value: action.newCredentials.value
            };
        case actionTypes.CHANGE_CREDENTIALS_OR:
            return {
                name: action.newCredentials.name,
                type: 'OR',
                value: action.newCredentials.value
            };
        default:
            return state;
    };
};

export default reducer;
