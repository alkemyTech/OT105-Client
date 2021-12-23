import React, { useState, useEffect } from 'react';
import { Alert } from '@mui/material';
import { getCategories } from '../../Services/CategoriesService';
import CategoriesSearchForm from './SearchForm/CategoriesSearchForm';
import { listHasValues } from '../../Utils';
import style from '../../Styles/Categories/CategoriesList/Backoffice_ListCategories.module.css';
import CustomTable3Cols from '../CustomComponents/CustomTable/CustomTable3Cols';

const Backoffice_ListCategories = () => {
  const [categories, setCategories] = useState(null);

  const deletecategory = (id) => {
    const isDelete = window.confirm(
      `Estas seguro de querer eliminar la categoria "${id}"`,
    );

    if (isDelete) {
      let result = categories.filter((e) => {
        return e.id !== id;
      });

      return setCategories(result);
    }
  };

  const editcategory = (id) => {
    const isedit = window.confirm(
      `Estas seguro de querer editar la categoria "${id}"`,
    );
  };

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  return (
    <div className={style.listContainer}>
      <h1 style={{ textAlign: 'center' }}>Categorias</h1>
      <CategoriesSearchForm setCategories={setCategories} />
      {!listHasValues(categories) && categories !== null ? (
        <Alert
          sx={{ margin: '0 auto', justifyContent: 'center' }}
          severity="warning">
          Categoria no encontrada!
        </Alert>
      ) : null}
      {listHasValues(categories) && (
        <CustomTable3Cols
          list={categories}
          tableTitle="Categorias"
          newItemBtnText="Nueva Categoria"
          editItemURL="create-category"
          deleteItemFn={deletecategory}
          firstColMethod="name"
          secondColMethod="created_at"
          firstColName="Name"
          secondColName="Creado"
        />
      )}
    </div>
  );
};
//

export default Backoffice_ListCategories;
