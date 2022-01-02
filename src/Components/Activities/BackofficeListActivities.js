import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Toolbar,
  Tooltip,
  Container,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Avatar,
  ListItemAvatar,
  IconButton,
  Button,
  Box,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LoadSpinner from '../CommonComponents/LoaderSpinner';
import {
  getActivities,
  deleteActivity,
} from '../../Services/ActivitiesServices';
import ActivitiesSearchForm from './ActivitiesSearchForm';
import s from '../../Styles/Categories/CategoriesList/Backoffice_ListCategories.module.css';
import { listHasValues, sliceDate } from '../../Utils';
import { StyledTableCell, StyledTableRow } from '../../Styles/TableStyles';
import { memberAvatarStyle } from '../../Styles/MembersList/MembersListInlineStyles';
import SortableTableCell from '../Users/SortableTableCell';

function BackofficeListActivities() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [activities, setActivities] = useState([{}]);
  const [sortedActivitiesList, setSortedActivitiesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const rowsPerPage = 10;
  const rowHeight = 53;

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - activities.length) : 0;

  const isLastItemOnPage = () => {
    const total = activities.length - 1;
    const pages = total / rowsPerPage;

    return page === pages && page !== 0;
  };

  const updateActivitiesList = (updatedActivities) => {
    setActivities(updatedActivities);
  };

  const deleteActivityById = (id) => {
    const isDelete = window.confirm(
      `Estas seguro de querer eliminar la tarea "${id}"`,
    );

    if (isDelete) {
      let result = activities.filter((e) => {
        return e.id !== id;
      });

      deleteActivity(id);

      return setActivities(result);
    }

    if (isLastItemOnPage()) {
      setPage(page - 1);
    }
  };

  const sortList = (list) => {
    const sortedList = list
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return sortedList;
  };

  useEffect(() => {
    setIsLoading(true);
    getActivities().then((resp) => {
      setActivities(resp);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const newSortedActivitiesList = sortList(activities);

    setSortedActivitiesList(newSortedActivitiesList);
  }, [order, orderBy, page, activities]);

  return (
    <div className={s.listContainer}>
      <h1 style={{ textAlign: 'center' }}>Actividades</h1>
      <ActivitiesSearchForm updateActivitiesList={updateActivitiesList} />
      {!listHasValues(activities) ? (
        <Alert
          severity="warning"
          sx={{ margin: '0 auto', justifyContent: 'center' }}>
          Actividad no encontrada!
        </Alert>
      ) : null}

      <Container sx={{ my: '1rem' }}>
        <Box>
          <Paper>
            <Toolbar sx={{ backgroundColor: '#e1e1e1' }}>
              <Typography component="div" sx={{ mr: 'auto' }} variant="h6">
                Actividades
              </Typography>
              <Button
                className="customTableBtn"
                component={Link}
                to="/backoffice/activities/create"
                variant="contained">
                Nueva Actividad
              </Button>
            </Toolbar>
            <TableContainer>
              <Table
                aria-labelledby="tableTitle"
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
                    <TableCell align="center">Imagen</TableCell>
                    <TableCell align="center">Creado</TableCell>
                    <TableCell align="right">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                {isLoading ? (
                  <TableBody>
                    <TableRow
                      style={{
                        height: rowHeight * 10,
                      }}>
                      <TableCell colSpan={3}>
                        <LoadSpinner />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <TableBody>
                    {sortedActivitiesList.map((row) => (
                      <>
                        <StyledTableRow key={row.id} hover>
                          <StyledTableCell component="th" scope="row">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <ListItemAvatar sx={{ marginTop: 0 }}>
                              <Avatar
                                alt={row.name}
                                src={row.image}
                                sx={memberAvatarStyle}
                              />
                            </ListItemAvatar>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {sliceDate(row.created_at)}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Tooltip title="Editar">
                              <IconButton
                                component={Link}
                                to={`/backoffice/activities/edit/${row.id}`}
                                variant="contained">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar">
                              <IconButton
                                onClick={() => deleteActivityById(row.id)}>
                                <DeleteIcon color="error" />
                              </IconButton>
                            </Tooltip>
                          </StyledTableCell>
                        </StyledTableRow>
                      </>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            {!isLoading && (
              <TablePagination
                component="div"
                count={activities.length}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10]}
                onPageChange={handleChangePage}
              />
            )}
          </Paper>
        </Box>
      </Container>
    </div>
  );
}

export default BackofficeListActivities;
