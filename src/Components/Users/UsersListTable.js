import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Button,
  Container,
  Toolbar,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SortableTableCell from './SortableTableCell';
import LoadSpinner from '../CommonComponents/LoaderSpinner';
import { getAllUsers, deleteUsers } from '../../Services/userService';
import UsersSearchForm from './UsersSearchForm';

const UsersListTable = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [usersList, setUsersList] = useState([]);
  const [sortedUsersList, setSortedUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usersList.length) : 0;

  const rowHeight = 53;

  const isLastItemOnPage = () => {
    const total = usersList.length - 1;
    const pages = total / rowsPerPage;

    return page === pages && page !== 0;
  };

  const deleteUser = async (id) => {
    const response = await deleteUsers(id);

    if (response.data.success) {
      const newUsersList = usersList.filter((user) => user.id !== id);

      setUsersList(newUsersList);
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
    const newSortedUsersList = sortList(usersList);

    setSortedUsersList(newSortedUsersList);
  }, [order, orderBy, page, usersList]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getAllUsers();
      const newUserList = response.data.data;

      setUsersList(newUserList);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Container sx={{ my: '1rem' }}>
      <Typography align="center" id="tableTitle" marginY={4} variant="h3">
        Usuarios
      </Typography>
      <Box>
        <Paper>
          <Toolbar>
            <UsersSearchForm
              setIsLoading={setIsLoading}
              setUsersList={setUsersList}
            />
            <Button
              component={Link}
              to="/backoffice/users/create"
              variant="contained">
              Nuevo Usuario
            </Button>
          </Toolbar>
          <TableContainer>
            <Table
              aria-labelledby="tableTitle"
              size="small"
              sx={{ minWidth: 600 }}>
              <TableHead>
                <TableRow>
                  <SortableTableCell
                    columnLabel="Nombre"
                    columnName="name"
                    handleRequestSort={handleRequestSort}
                    order={order}
                    orderBy={orderBy}
                  />
                  <SortableTableCell
                    columnLabel="Email"
                    columnName="email"
                    handleRequestSort={handleRequestSort}
                    order={order}
                    orderBy={orderBy}
                  />
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
                  {sortedUsersList.map((row) => {
                    return (
                      <TableRow key={row.id} hover tabIndex={-1}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell align="right">
                          <Tooltip title="Editar">
                            <IconButton
                              component={Link}
                              to={`/backoffice/users/edit/${row.id}`}
                              variant="contained">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar">
                            <IconButton onClick={() => deleteUser(row.id)}>
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRowsToAvoidLayoutJump > 0 && (
                    <TableRow
                      style={{
                        height: rowHeight * emptyRowsToAvoidLayoutJump,
                      }}>
                      <TableCell colSpan={3} />
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          {!isLoading && (
            <TablePagination
              component="div"
              count={usersList.length}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[10]}
              onPageChange={handleChangePage}
            />
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default UsersListTable;
