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

const Patch = async (url, data) => {
  //callback method for header
  return await axios
    .post(url, data, {
      //headers: authorizacionHeader
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export default { Get, Patch };
