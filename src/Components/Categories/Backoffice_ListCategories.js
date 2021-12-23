import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  TableCell,
  IconButton,
  Tooltip,
  TablePagination,
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
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRowsToAvoidLayoutJump =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0;

  const rowHeight = 53;

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
          <Container sx={{ my: '1rem' }}>
            <Box>
              <Paper>
                <Toolbar sx={{ backgroundColor: '#e1e1e1' }}>
                  <Typography
                    component="div"
                    id="tableTitle"
                    sx={{ mr: 'auto' }}
                    variant="h6">
                    Categorias
                  </Typography>
                  <Button
                    component={Link}
                    to="/create-category"
                    variant="contained">
                    Nueva Categoria
                  </Button>
                </Toolbar>
                <TableContainer component={Paper}>
                  <Table aria-label="tableTitle" sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Nombre</TableCell>
                        <TableCell align="center">Creado</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {categories.map((row) => (
                        <StyledTableRow key={row.id} hover tabIndex={-1}>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="left">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.created_at}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Tooltip title="Editar">
                              <IconButton
                                component={Link}
                                to={`/create-category/${row.id}`}
                                variant="contained">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar">
                              <IconButton>
                                <DeleteIcon color="error" />
                              </IconButton>
                            </Tooltip>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                      {emptyRowsToAvoidLayoutJump > 0 && (
                        <TableRow
                          style={{
                            height: rowHeight * emptyRowsToAvoidLayoutJump,
                          }}>
                          <TableCell colSpan={3} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  component="div"
                  count={categories.length}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[10]}
                  onPageChange={handleChangePage}
                />
              </Paper>
            </Box>
          </Container>
        )}
      </div>
    </div>
  );
};
//

export default Backoffice_ListCategories;
