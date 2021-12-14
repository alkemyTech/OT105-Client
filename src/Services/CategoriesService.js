import axios from 'axios';

export const CATEGORIES_URL = 'http://ongapi.alkemy.org/api/categories';

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

export { createCategorie, editCategorie };
