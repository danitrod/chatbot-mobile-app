import * as actionTypes from '../actions/actionTypes';

const initialState = {
    type: 'WA',
    name: 'My Assistant',
    values: {
        apikey: 'apikey_test',
        assistantId: 'test_assistant_id',
        url: 'test_url',
        sessionId: 'test_session_id'
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CREDENTIALS:
            return action.credentials;
        default:
            return state;
    };
};

export default reducer;
