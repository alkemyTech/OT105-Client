import axios from 'axios';

const CATEGORIES_URL = 'http://ongapi.alkemy.org/api/categories/';

export const createOrEditCategories = (id, body) => {
  if (id) {
    const response = updateCategories(id, body);

    return response;
  } else {
    const response = createCategories(body);

    return response;
  }
};

const createCategories = async (body) => await axios.post(CATEGORIES_URL, body);

const updateCategories = async (id, body) =>
  await axios.patch(`${CATEGORIES_URL}${id}`, body);
