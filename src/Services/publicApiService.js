import axios from 'axios';

const config = {
  headers: {
    Group: 105, //Aqui va el ID del equipo!!
  },
};

const publicGet = async (route, id) => {
  let url;

  if (id === undefined || id === null) {
    url = `http://ongapi.alkemy.org/api${route}`;
  } else {
    if (typeof id !== 'number') {
      throw 'id must be type Number';
    } else {
      url = `http://ongapi.alkemy.org/api${route}/${id}`;
    }
  }

  try {
    const res = await axios.get(url, config);

    return res.data.data;
  } catch (err) {
    return err.response.data;
  }
};

export { publicGet };
