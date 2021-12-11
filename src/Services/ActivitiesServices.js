import axios from 'axios';

const Url = 'http://ongapi.alkemy.org/api/activities';

export const getActivities = async () => {
  try {
    const { data } = await axios.get(Url);

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const getActivityById = async (id) => {
  try {
    const { data } = await axios.get(`${Url}/${id}`);

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
export const postActivity = async ({ activity }) => {
  await axios
    .post(Url, activity)
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const putActivity = async ({ activity }) => {
  await axios
    .put(`${Url}/${activity.id}`, activity)
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const deleteActivityById = async (id) => {
  try {
    const { data } = await axios.delete(`${Url}/${id}`);

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
