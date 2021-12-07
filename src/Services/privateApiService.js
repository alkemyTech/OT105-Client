import axios from 'axios';

const config = {
  headers: {
    Group: 1, //Aqui va el ID del equipo!!
  },
};

const Get = () => {
  axios
    .get('https://jsonplaceholder.typicode.com/users', config)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const getAuthorizationHeader = () => {
  if (!window.localStorage.hasOwnProperty('token')) return new Error('no token found');
  const token = localStorage.token;

  const Header = {
    Authorization: 'Bearer' + token,
  };

  return Header;
};

export default Get;
