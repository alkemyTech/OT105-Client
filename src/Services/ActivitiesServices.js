import axios from 'axios';

export const ACTIVITIES_URL = 'http://ongapi.alkemy.org/api/activities';

const getActivities = async (activitiesId) => {
  try {
    if (activitiesId == null) {
      const res = await axios.get(ACTIVITIES_URL);

      return res.data.data;
    } else {
      const res = await axios.get(`${ACTIVITIES_URL}/${activitiesId}`);

      return res.data.data;
    }
  } catch (err) {
    return err.response.data;
  }
};

const createActivity = async (activity) => {
  try {
    const res = await axios.post(ACTIVITIES_URL, activity);

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const editActivity = async (activityId, editActivity) => {
  try {
    const res = await axios.put(
      `${ACTIVITIES_URL}/${activityId}`,
      editActivity,
    );

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const deleteActivity = async (activityId) => {
  try {
    const res = await axios.delete(`${ACTIVITIES_URL}/${activityId}`);

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export { getActivities, createActivity, editActivity, deleteActivity };
