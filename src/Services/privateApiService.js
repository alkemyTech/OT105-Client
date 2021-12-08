import axios from 'axios';

const config = {
  headers: {
    Group: 105, //Aqui va el ID del equipo!!
  },
};

const Get = () => {
  axios
    .get('https://jsonplaceholder.typicode.com/users', config)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const Patch = async (url, data) => {
  getAuthorizationHeader()
  console.log('hola')
  return await axios
    .post(url, data, {
      headers: getAuthorizationHeader().Authorization
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const getAuthorizationHeader = () => {
  if (!localStorage.getItem('token')) return new Error('no token found');
  const token = localStorage.token;

  const Header = {
    Authorization: 'Bearer' + token,
  };

  return Header;
};

Patch()

export default { Get };
