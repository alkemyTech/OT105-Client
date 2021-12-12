import Axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://ongapi.alkemy.org/api/projects';

export const createOrUpdateProject = (id, data) => {
  if (!id) {
    createProject(data);
  } else {
    updateProject(id, data);
  }
};

const createProject = (data) => {
  Axios.post(baseUrl, data).then(() => {
    Swal.fire('success');
    console.log(data);
  });
};

const updateProject = async (id, data) => {
  await Axios.patch(`${baseUrl}/${id}`, data).then(() => {
    console.log(data);
    Swal.fire('success');
  });
};
