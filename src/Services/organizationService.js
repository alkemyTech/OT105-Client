import axios from 'axios';

const getOrganizacion = async () => {
  try {
    const response = await axios(process.env.REACT_APP_GET_ORGANIZATION);
    return response.data;
  } catch (err) {
    return err.respose.data;
  }
};

const getOrganizacionById = async (id) => {
  try {
    const response = await axios(
      `${process.env.REACT_APP_GET_ORGANIZATION_BY_ID}/${id}`,
    );
    return response.data;
  } catch (err) {
    return err.respose.data;
  }
};

const editOrganization = (id, body) => {
  try {
    const response = axios.put(
      `${process.env.REACT_APP_EDIT_ORGANIZATION}/${id}`,
      body,
    );
    return response.data;
  } catch (err) {}
};

const createOrganization = (body) => {
  try {
    const response = await axios.post(process.env.CREATE_ORGANIZATION);
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export {
  getOrganizacion,
  getOrganizacionById,
  editOrganization,
  createOrganization,
};
