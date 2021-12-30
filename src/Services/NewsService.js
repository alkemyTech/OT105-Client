import axios from 'axios';
export const urlEditNews = `http://ongapi.alkemy.org/public/api/news/`;
export const urlCreateNews = `http://ongapi.alkemy.org/public/api/news`;

const NEWS_URL = 'http://ongapi.alkemy.org/api/news';

const getAllNews = async () => {
  try {
    const res = await axios.get(NEWS_URL);

    return res.data.data;
  } catch (err) {
    return err.response.data;
  }
};

const getNewsByKeyword = async (keywords) => {
  try {
    const res = await axios.get(`${NEWS_URL}?search=${keywords}`);

    return res.data.data;
  } catch (err) {
    return err.response.data;
  }
};

const getNewsById = async (newsId) => {
  try {
    const res = await axios.get(`${NEWS_URL}/${newsId}`);

    return res.data.data;
  } catch (err) {
    return err.response.data;
  }
};

const createNews = async (news) => {
  try {
    const res = await axios.post(NEWS_URL, news);

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const editNews = async (newsId, editedNews) => {
  try {
    const res = await axios.put(`${NEWS_URL}/${newsId}`, editedNews);

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const deleteNews = async (newsId) => {
  try {
    const res = await axios.delete(`${NEWS_URL}/${newsId}`);

    return res.data;
  } catch (err) {
    return err.response.data;
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
