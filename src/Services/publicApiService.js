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

export const publicPost = async (url, body) => {
  try {
    const resp = await axios.post(url, body);

    return resp;
  } catch (error) {
    return error;
  }
};

export default Get;
