import React, { useState, useEffect } from 'react';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledTableCell, StyledTableRow } from '../../Styles/TableStyles';
import { getCategories } from '../../Services/CategoriesService';
import CategoriesSearchForm from './SearchForm/CategoriesSearchForm';
import { listHasValues } from '../../Utils';
import style from '../../Styles/Categories/CategoriesList/Backoffice_ListCategories.module.css';

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
      <div>
        {listHasValues(categories) && (
          <TableContainer component={Paper}>
            <Table aria-label="caption table" sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">CreatedAt</StyledTableCell>
                  <StyledTableCell align="center">Edit</StyledTableCell>
                  <StyledTableCell align="center">Delete</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      color="error"
                      href="/create-category"
                      variant="contained">
                      Create
                    </Button>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories?.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.created_at}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        href={`/create-category/${row.id}`}
                        startIcon={<EditIcon color="primary" />}
                        variant="outlined"
                        onClick={() => editcategory(row.id)}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        startIcon={<DeleteIcon color="primary" />}
                        variant="outlined"
                        onClick={() => deletecategory(row.id)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};
//

export default Backoffice_ListCategories;
