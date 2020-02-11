import * as actionTypes from '../actions/actionTypes';

const initialState = {
    type: 'WA',
    name: 'My Assistant',
    values: {
        apikey: 'apikey_test',
        assistantId: 'test_assistant_id'
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_CREDENTIALS:
            return action.newCredentials;
        default:
            return state;
    };
};

export default reducer;
