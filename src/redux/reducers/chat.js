import * as actionTypes from '../actions/actionTypes';

const initialState = {
    history: [{ type: 'txt', msg: 'Hi, my name is Watson', from: 'other' }]
};

const reducer = (state = initialState, action) => {
    console.log('reducer called');
    console.log('new history:', state.history.concat(action.message));
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
