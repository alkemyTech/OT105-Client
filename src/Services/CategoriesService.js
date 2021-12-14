import axios from 'axios';
import es from 'date-fns/locale/es';

const CATEGORIES_URL = 'http://ongapi.alkemy.org/api/categories';

const getCategoryOrCategories = async (categorieId) => {
  try {
    if (categorieId == null) {
      const res = await axios.get(CATEGORIES_URL);

      return res.data.data;
    } else {
      const res = await axios.get(`${CATEGORIES_URL}/${categorieId}`);

      return res.data.data;
    }
  } catch (err) {
    return err.response.data;
  }
};

const createCategory = async (categorie) => {
  try {
    const res = await axios.post(CATEGORIES_URL, categorie);

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

const editCategory = async (categorieId, editCategorie) => {
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

const deleteCategory = async (categorieId) => {
  try {
    const res = await axios.delete(`${CATEGORIES_URL}/${categorieId}`);

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export {
  getCategoryOrCategories,
  createCategory,
  editCategory,
  deleteCategory,
};
