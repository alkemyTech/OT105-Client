import Axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://ongapi.alkemy.org/api/categories/';

export const createOrUpdateActivity = (id, data) => {
  if (id) {
    createActivity(id, data);
  } else {
    updateActivity(data);
  }
};

const createActivity = async (id, data) => {
  await Axios.patch(`${baseUrl}${id}`, data).then(() => {
    Swal.fire('success');
  });
};

const updateActivity = async (data) => {
  await Axios.post(`${baseUrl}`, data).then(() => {
    console.log(data);
    Swal.fire('success');
  });
};
