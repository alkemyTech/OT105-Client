import Axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://ongapi.alkemy.org/api/activities';

export const createOrUpdateActivity = (id, data) => {
  if (!id) {
    createActivity(data);
  } else {
    updateActivity(id, data);
  }
};

const createActivity = (data) => {
  Axios.post(baseUrl, data);
  Swal.fire('success');
  console.log(data);
};

const updateActivity = async (id, data) => {
  await Axios.patch(`${baseUrl}/${id}`, data).then(() => {
    console.log(data);
    Swal.fire('success');
  });
};
