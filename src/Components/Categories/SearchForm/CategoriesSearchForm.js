import React from 'react';
import TextField from '@mui/material/TextField';
import {
  getCategories,
  getCategoriesbyTerm,
} from '../../../Services/CategoriesService';
import style from '../../../Styles/Categories/CategoriesSearch/CategoriesSearchForm.module.css';

const CategoriesSearchForm = ({ setCategories }) => {
  const handleChange = (e) => {
    if (e.target.value.length > 2) {
      const searchTerm = e.target.value;

      getCategoriesbyTerm(searchTerm).then((data) => setCategories(data));
    } else {
      getCategories().then((data) => setCategories(data));
    }
  };

  const debounceFn = (fn) => {
    let timeoutId;

    return function () {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const context = this;
      const args = arguments;

      timeoutId = setTimeout(() => {
        fn.apply(context, args);
      }, 500);
    };
  };

  const debouncedHandleChange = debounceFn(handleChange);

  return (
    <div className={style.searchBarContainer}>
      <TextField
        sx={{ width: '100%' }}
        autoComplete="off"
        label="Filtrar categoría"
        variant="outlined"
        onChange={debouncedHandleChange}
      />
    </div>
  );
};

export default CategoriesSearchForm;
