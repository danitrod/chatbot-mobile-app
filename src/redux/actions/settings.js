import * as actionTypes from './actionTypes';
import { add } from './index';
import { createSession, sendMessage } from '../../services/assistant/conversation';

export const changeCredentials = (newCredentials) => {
    return async dispatch => {
        dispatch(changeCredentialsStarted());
        const res = await createSession(newCredentials.values);
        if (res.err !== true) {
            newCredentials.values.sessionId = res.sessionId;
            const messageResponse = await sendMessage(newCredentials.values, '');
            if (messageResponse.err !== true) {
                messageResponse.msg.map(msg => dispatch(add({
                    type: 'txt',
                    msg,
                    from: 'other',
                    time: new Date()
                })));
                dispatch(changeCredentialsSuccess(newCredentials));
            } else {
                dispatch(changeCredentialsFailure(messageResponse.msg));
            };
        } else {
            dispatch(changeCredentialsFailure(res.msg));
        };
    };
};

const changeCredentialsStarted = () => ({
    type: actionTypes.CHANGE_CREDENTIALS_STARTED
});
const changeCredentialsSuccess = newCredentials => ({
    type: actionTypes.CHANGE_CREDENTIALS_SUCCESS,
    newCredentials
});

const changeCredentialsFailure = error => ({
    type: actionTypes.CHANGE_CREDENTIALS_FAILURE,
    msg: error
});
