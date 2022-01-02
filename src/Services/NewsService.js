import axios from 'axios';
import { errorAlert } from './alertsService';

export const urlEditNews = `http://ongapi.alkemy.org/public/api/news/`;
export const urlCreateNews = `http://ongapi.alkemy.org/public/api/news`;

const NEWS_URL = 'http://ongapi.alkemy.org/api/news';

const getAllNews = async () => {
  try {
    const res = await axios.get(NEWS_URL);

    return res.data.data;
  } catch (err) {
    errorAlert('Error', err.data || 'Error al obtener las Novedades');

    return err.data || err;
  }
};

const getNewsByKeyword = async (keywords) => {
  try {
    const res = await axios.get(`${NEWS_URL}?search=${keywords}`);

    return res.data.data;
  } catch (err) {
    errorAlert('Error', err.data || 'Error al obtener la Novedad');

    return err.data || err;
  }
};

const getNewsById = async (newsId) => {
  try {
    const res = await axios.get(`${NEWS_URL}/${newsId}`);

    return res.data.data;
  } catch (err) {
    errorAlert('Error', err.data || 'Error al obtener la Novedad');

    return err.data || err;
  }
};

const createNews = async (news) => {
  try {
    const res = await axios.post(NEWS_URL, news);

    return res.data;
  } catch (err) {
    errorAlert('Error', err.data || 'Error al crear la Novedad');

    return err.data || err;
  }
};

const editNews = async (newsId, editedNews) => {
  try {
    const res = await axios.put(`${NEWS_URL}/${newsId}`, editedNews);

    return res.data;
  } catch (err) {
    errorAlert('Error', err.data || 'Error al editar la Novedad');

    return err.data || err;
  }
};

const deleteNews = async (newsId) => {
  try {
    const res = await axios.delete(`${NEWS_URL}/${newsId}`);

    return res.data;
  } catch (err) {
    errorAlert('Error', err.data || 'Error al eliminar la Novedad');

    return err.data || err;
  }
};

export {
  getAllNews,
  getNewsByKeyword,
  getNewsById,
  createNews,
  editNews,
  deleteNews,
};
