import axios from 'axios';

const CATEGORIES_URL = 'http://ongapi.alkemy.org/api/categories';

const getAllCategories = async () => {
  try {
    const res = await axios.get(CATEGORIES_URL);

    return res.data.data;
  } catch (err) {
    return err.response.data;
  }
};

const getCategorieById = async (categorieId) => {
  try {
    const res = await axios.get(`${CATEGORIES_URL}/${categorieId}`);

    return res.data.data;
  } catch (err) {
    return err.response.data;
  }
};

const createCategorie = async (categorie) => {
  try {
    const res = await axios.post(CATEGORIES_URL, categorie);

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const editCategorie = async (categorieId, editCategorie) => {
  try {
    const res = await axios.put(
      `${CATEGORIES_URL}/${categorieId}`,
      editCategorie,
    );

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const deleteCategorie = async (categorieId) => {
  try {
    const res = await axios.delete(`${CATEGORIES_URL}/${categorieId}`);

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export {
  getAllCategories,
  getCategorieById,
  createCategorie,
  editCategorie,
  deleteCategorie,
};
