import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
import CategoriesSearchForm from './SearchForm/CategoriesSearchForm';
import {
  getAllCategories,
  deleteCategorybyId,
} from '../../features/categories/categoriesAsyncThunks';
import SortableTableCell from '../Users/SortableTableCell';
import { listHasValues, sliceDate } from '../../Utils';
import style from '../../Styles/Categories/CategoriesList/Backoffice_ListCategories.module.css';
import { StyledTableCell, StyledTableRow } from '../../Styles/TableStyles';
import '../../Styles/TablesStyles.css';

const categoriess = [
  {
    created_at: '2021-12-30T20:30:50.000000Z',
    deleted_at: null,
    description: '<p>Fiestas de la comunidad</p>',
    group_id: null,
    id: 1426,
    image: 'http://ongapi.alkemy.org/storage/awpnHjlP3Z.png',
    name: 'Fiestas',
    parent_category_id: null,
    updated_at: '2021-12-30T20:30:50.000000Z',
  },
  {
    created_at: '2021-12-30T20:32:22.000000Z',
    deleted_at: null,
    description: '<p>Fiestas de la comunidad</p>',
    group_id: null,
    id: 1427,
    image: 'http://ongapi.alkemy.org/storage/KEmDiYVnlc.png',
    name: 'Fiesta',
    parent_category_id: null,
    updated_at: '2021-12-30T20:32:22.000000Z',
  },
  {
    created_at: '2021-12-30T20:34:42.000000Z',
    deleted_at: null,
    description: '<p>Eventos de la comunidad</p>',
    group_id: null,
    id: 1428,
    image: 'http://ongapi.alkemy.org/storage/3nr8XTehUM.png',
    name: 'Evento',
    parent_category_id: null,
    updated_at: '2021-12-30T20:34:42.000000Z',
  },
];

const Backoffice_ListCategories = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);
  const [categoriesList, setCategoriesList] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [sortedUsersList, setSortedUsersList] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }

    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRowsToAvoidLayoutJump =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0;

  const rowHeight = 53;

  const isLastItemOnPage = () => {
    const total = categories.length - 1;
    const pages = total / rowsPerPage;

    return page === pages && page !== 0;
  };

  const deletecategory = (id) => {
    const isDelete = window.confirm(
      `Estas seguro de querer eliminar la categoria "${id}"`,
    );

    if (isDelete) {
      dispatch(deleteCategorybyId(id));
    }

    if (isLastItemOnPage()) {
      setPage(page - 1);
    }
  };

  const sortList = (list) => {
    if (list) {
      const sortedList = list
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

      return sortedList;
    }
  };

  const updateCategoriesList = () => {
    setCategoriesList([...categories]);
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    if (!loading) {
      updateCategoriesList();
    }
  }, [loading]);

  useEffect(() => {
    setTimeout(() => {
      const newSortedUsersList = sortList(categoriesList);

      setSortedUsersList(newSortedUsersList);
    });
  }, [order, orderBy, page, categoriesList]);

  return (
    <div className={style.listContainer}>
      <h1 style={{ textAlign: 'center' }}>Categorías</h1>
      <CategoriesSearchForm />
      {!listHasValues(categories) && categories !== null ? (
        <Alert
          severity="warning"
          sx={{ margin: '0 auto', justifyContent: 'center' }}>
          Categoría no encontrada!
        </Alert>
      ) : null}
      {listHasValues(categories) && (
        <Container sx={{ my: '1rem' }}>
          <Box>
            <Paper>
              <Toolbar sx={{ backgroundColor: '#e1e1e1' }}>
                <Typography component="div" sx={{ mr: 'auto' }} variant="h6">
                  Categorías
                </Typography>
                <Button
                  className="customTableBtn"
                  component={Link}
                  to={`/backoffice/categories/create`}
                  variant="contained">
                  Nueva categoría
                </Button>
              </Toolbar>
              <TableContainer>
                <Table
                  aria-label="tableTitle"
                  size="small"
                  sx={{ maxWidth: 900 }}>
                  <TableHead>
                    <TableRow>
                      <SortableTableCell
                        columnLabel="Nombre"
                        columnName="name"
                        handleRequestSort={handleRequestSort}
                        order={order}
                        orderBy={orderBy}
                      />
                      <TableCell align="center" className="customTableCol">
                        Creado
                      </TableCell>
                      <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedUsersList?.map((row) => (
                      <StyledTableRow
                        key={row.id}
                        hover
                        sx={{ height: '3px' }}
                        tabIndex={-1}>
                        <StyledTableCell
                          align="left"
                          component="th"
                          scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          className="customTableCol">
                          {sliceDate(row.created_at)}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Tooltip title="Editar">
                            <IconButton
                              component={Link}
                              to={`/backoffice/categories/edit/${row.id}`}
                              variant="contained">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar">
                            <IconButton onClick={() => deletecategory(row.id)}>
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
  );
};
//

export default Backoffice_ListCategories;
