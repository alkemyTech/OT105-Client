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
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export default Get;
