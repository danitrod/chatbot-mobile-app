import axios from 'axios';

const createSession = async (credentials) => {
  const url = `${credentials.url}/v2/assistants/${credentials.assistantId}/sessions?version=2020-02-12`;
  return new Promise((resolve) => {
    axios
      .post(
        url,
        {},
        {
          auth: {
            username: 'apikey',
            password: credentials.apikey
          }
        }
      )
      .then((res) => {
        resolve({
          err: false,
          sessionId: res.data.session_id
        });
      })
      .catch((e) => {
        resolve({
          err: true,
          msg: e
        });
      });
  });
};

const sendMessageToWatson = (credentials, text) => {
  const url = `${credentials.url}/v2/assistants/${credentials.assistantId}/sessions/${credentials.sessionId}/message?version=2020-02-12`;
  return new Promise((resolve) => {
    axios
      .post(
        url,
        {
          input: {
            text
          }
        },
        {
          auth: {
            username: 'apikey',
            password: credentials.apikey
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then((res) => {
        resolve({
          err: false,
          msg: res.data.output.generic.map((response) => response.text)
        });
      })
      .catch((e) => {
        resolve({
          err: true,
          msg: e
        });
      });
  });
};

export { createSession, sendMessageToWatson };
