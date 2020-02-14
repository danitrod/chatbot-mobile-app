import * as actionTypes from './actionTypes';
import { setCredentials } from './settings';
import { sendMessageToWatson, createSession } from '../../services/conversation';
import { sendMessageToOrchestrator } from '../../services/orchestrator';

// Adds sent message to state, then sends message to Watson/Orchestrator and adds response to state.
// TODO: implement speech to text case
export const addMessage = message => {
    return async (dispatch, getState) => {
        dispatch(addMessageSuccess(message));
        const credentials = getState().settingsReducer.values;
        if (credentials.type === 'WA') {
            if (message.type === 'txt') {
                const messageResponse = await sendMessageToWatson(credentials, message.msg);
                if (messageResponse.err !== true) {
                    messageResponse.msg.map((msg, index) => dispatch(addMessageSuccess({
                        type: 'txt',
                        msg,
                        from: 'other',
                        time: new Date().toString() + `-${index}`
                    })));
                } else {
                    dispatch(addMessageFailure(messageResponse.msg));
                };
            };
        } else {
            if (message.type === 'txt') {
                const messageResponse = await sendMessageToOrchestrator(credentials, message.msg);
                if (messageResponse.err !== true) {
                    messageResponse.msg.map((msg, index) => dispatch(addMessageSuccess({
                        type: 'txt',
                        msg,
                        from: 'other',
                        time: new Date().toString() + `-${index}`
                    })));
                } else {
                    dispatch(addMessageFailure(messageResponse.msg));
                };
            };
        };
    };
};


// Case Watson: Creates new session, adds sessionId to state, clears message history and adds the first message to state.
// Case orchestrator: Clears message history and adds first message to state. (session id not used for orchestrator)
export const refresh = () => {
    return async (dispatch, getState) => {
        const credentials = getState().settingsReducer.values;
        if (credentials.type === 'WA') {
            const res = await createSession(credentials);
            if (res.err !== true) {
                credentials.sessionId = res.sessionId;
                dispatch(setCredentials(credentials));
                const messageResponse = await sendMessageToWatson(credentials, 'oi');
                if (messageResponse.err !== true) {
                    dispatch(refreshSuccess(messageResponse.msg.map((msg, index) => ({
                        type: 'txt',
                        msg,
                        from: 'other',
                        time: new Date().toString() + `-${index}`
                    }))));
                } else {
                    dispatch(refreshFailure(messageResponse.msg));
                };
            } else {
                dispatch(refreshFailure(res.msg));
            };
        } else {
            const messageResponse = await sendMessageToOrchestrator(credentials, 'oi');
            if (messageResponse.err !== true) {
                dispatch(refreshSuccess(messageResponse.msg.map((msg, index) => ({
                    type: 'txt',
                    msg,
                    from: 'other',
                    time: new Date().toString() + `-${index}`
                }))));
            } else {
                dispatch(refreshFailure(messageResponse.msg));
            };
        };
    };
};

const addMessageSuccess = message => ({
    type: actionTypes.ADD_MESSAGE_SUCCESS,
    message
});

const addMessageFailure = error => ({
    type: actionTypes.ADD_MESSAGE_FAILURE,
    msg: error
});

const refreshSuccess = message => ({
    type: actionTypes.REFRESH_SUCCESS,
    message
});

const refreshFailure = error => ({
    type: actionTypes.REFRESH_FAILURE,
    msg: error
});
