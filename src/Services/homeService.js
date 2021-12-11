import axios from 'axios';

const SLIDES_URL = 'http://ongapi.alkemy.org/api/slides';
const ORGANIZATION_URL = 'http://ongapi.alkemy.org/api/organization';

const getWelcomeMessage = async () => {
  try {
    const response = await axios(ORGANIZATION_URL);
    const welcomeText = response.data.data.welcome_text;

    return welcomeText;
  } catch (err) {
    return err.response.data;
  }
};

const getAllSlides = async () => {
  try {
    const response = await axios(SLIDES_URL);

    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const getSlideById = async (id) => {
  try {
    const response = await axios(`${SLIDES_URL}/${id}`);

    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const createSlide = async (body) => {
  try {
    const response = await axios.post(SLIDES_URL, body);

    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

const editSlide = async (id, body) => {
  try {
    const response = axios.put(`${SLIDES_URL}/${id}`, body);

    return response;
  } catch (err) {
    return err.response.data;
  }
};

const deleteSlide = async (id) => {
  try {
    const response = await axios.delete(`${SLIDES_URL}/${id}`);

    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export {
  getWelcomeMessage,
  getAllSlides,
  getSlideById,
  createSlide,
  editSlide as editSlideById,
  deleteSlide,
};