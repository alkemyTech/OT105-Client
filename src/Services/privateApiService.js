import axios from 'axios';

const getAuthorizationHeader = () => {
  const token = localStorage.getItem('token');
  const auth = 'Bearer ' + token;

  return token !== null ? auth : null;
};

const config = {
  headers: {
    Group: 105,
    Authorization: getAuthorizationHeader(),
  },
};

const Get = () => {
  axios
    .get('https://jsonplaceholder.typicode.com/users', config)
    // eslint-disable-next-line
    .then((res) => console.log(res))
    // eslint-disable-next-line
    .catch((err) => console.log(err));
};

export const privatePost = async (url, data) => {
  return await axios
    .post(url, data, config)
    // eslint-disable-next-line
    .then((response) => console.log(response))
    // eslint-disable-next-line
    .catch((error) => console.log(error));
};

export default Get;
