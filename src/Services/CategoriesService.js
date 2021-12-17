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

const imgToBase64 = (blob) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
};

const URLImageToBlob = async (URLImage) => {
  try {
    const response = await axios.get(URLImage, { responseType: 'blob' });
    const blob = new Blob([response.data], { type: response.data.type });
    const image = imgToBase64(blob, (e) => e.target.result);

    return image;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
    console.error(error.config);
  }
};

export {
  imgToBase64,
  URLImageToBlob,
  getCategoryOrCategories,
  createCategory,
  editCategory,
  deleteCategory,
};
