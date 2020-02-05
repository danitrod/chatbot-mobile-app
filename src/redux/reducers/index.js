import { combineReducers } from 'redux';


import chatReducer from './chat';
import settingsReducer from './settings';


const rootReducer = combineReducers({
    chatReducer,
    settingsReducer
});


export default rootReducer;
