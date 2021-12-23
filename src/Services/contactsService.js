import axios from 'axios';
import { errorAlert } from './alertsService';

const CONTACTS_URL = process.env.REACT_APP_CONTACTS;

const getContactInfo = async () => {
  try {
    const res = await axios.get(CONTACTS_URL);

    return res.data;
  } catch (err) {
    errorAlert(
      'Error',
      err.response.data.message || 'Error al obtener el mensaje de bienvenida',
    );

    return 'Mensaje de muestra';
  }
};

const sendContactData = async (data) => {
  try {
    const res = await axios.post(CONTACTS_URL, data);

    return res.data;
  } catch (err) {
    errorAlert('Error', err.response.data.message);

    return err.response.data || err;
  }
};

const editContactData = async (id, data) => {
  try {
    const res = await axios.put(`${CONTACTS_URL}/${id}`, data);

    return res.data;
  } catch (err) {
    errorAlert('Error', err.response.data.message);

    return err.response.data || err;
  }
};

const deleteContactData = async (id) => {
  try {
    const res = await axios.delete(`${CONTACTS_URL}/${id}`);

    return res.data;
  } catch (err) {
    errorAlert('Error', err.response.data.message);

    return err.response.data || err;
  }
};

export { sendContactData, getContactInfo, editContactData, deleteContactData };
