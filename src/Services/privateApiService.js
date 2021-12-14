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

export const privateDelete = async (path, id) => {
  try {
    const response = await axios.delete(`${path}/${id}`, config);

export const privatePUT = async (path, id, body) => {
  try {
    const response = await axios.put(`${path}/${id}`, body, config);


    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const privatePATCH = async (path, id, body) => {
  try {
    const response = await axios.patch(`${path}/${id}`, body, config);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
