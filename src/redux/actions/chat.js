import * as actionTypes from './actionTypes';
import { setCredentials } from './settings';
import { sendMessage, createSession } from '../../services/assistant/conversation';

export const addMessage = message => {
    return async (dispatch, getState) => {
        dispatch(addMessageSuccess(message));
        const credentials = getState().settingsReducer.values;
        if (message.type === 'txt') {
            const messageResponse = await sendMessage(credentials, message.msg);
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


// TODO: caso refresh do botão, criar nova sessão sem alterar as credenciais
export const refresh = () => {
    return async (dispatch, getState) => {
        const credentials = getState().settingsReducer;
        const res = await createSession(credentials.values);
        if (res.err !== true) {
            credentials.values.sessionId = res.sessionId;
            dispatch(setCredentials(credentials));
            const messageResponse = await sendMessage(credentials.values, '');
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
