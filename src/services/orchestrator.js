import axios from 'axios';

const sendMessageToOrchestrator = (credentials, text) => {
  return new Promise((resolve) => {
    axios
      .post(
        credentials.url,
        {
          input: {
            text
          }
        },
        {
          timeout: 7000
        }
      )
      .then((res) => {
        resolve({
          err: false,
          msg: res.data.output.text
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

export { sendMessageToOrchestrator };
