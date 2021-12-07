import { useState } from 'react';
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
  TableSortLabel,
  Paper,
  Button,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const mockedUsers = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Karley_Dach@jasper.info',
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
    username: 'Leopoldo_Corkery',
    email: 'Karley_Dach@jasper.info',
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
    username: 'Elwyn.Skiles',
    email: 'Telly.Hoeger@billy.biz',
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
    username: 'Maxime_Nienow',
    email: 'Sherwood@rosamond.me',
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    username: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
  },
  {
    id: 10,
    name: 'Clementina DuBuque',
    username: 'Moriah.Stanton',
    email: 'Rey.Padberg@karina.biz',
  },
  {
    id: 11,
    name: 'Patricia Reichert',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
  },
  {
    id: 12,
    name: 'Clementine Howell',
    username: 'Samantha',
    email: 'Sherwood@rosamond.me',
  },
  {
    id: 13,
    name: 'Chelsey Weissnat',
    username: 'Kamren',
    email: 'Chaim_McDermott@dana.io',
  },
];

const UsersListTable = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [usersList, setUsersList] = useState(mockedUsers);
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

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usersList.length) : 0;

  const deleteUser = (id) => {
    const newUsersList = usersList.filter((user) => user.id !== id);
    const total = usersList.length - 1;
    const pages = total / rowsPerPage;

    setUsersList(newUsersList);

    if (page === pages && page !== 0) {
      setPage(page - 1);
    }
  };

  return (
    <Container sx={{ my: '1rem' }}>
      <Box>
        <Paper>
          <Toolbar>
            <Typography
              component="div"
              id="tableTitle"
              sx={{ mr: 'auto' }}
              variant="h6">
              Lista de Usuarios
            </Typography>
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
                  <TableCell sortDirection={orderBy === 'name' ? order : false}>
                    <TableSortLabel
                      active={orderBy === 'name'}
                      direction={orderBy === 'name' ? order : 'asc'}
                      onClick={createSortHandler('name')}>
                      Nombre
                      {orderBy === 'name' ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc'
                            ? 'ordenado descendente'
                            : 'ordenado ascendente'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    align="right"
                    sortDirection={orderBy === 'email' ? order : false}>
                    <TableSortLabel
                      active={orderBy === 'email'}
                      direction={orderBy === 'email' ? order : 'asc'}
                      onClick={createSortHandler('email')}>
                      Email
                      {orderBy === 'email' ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc'
                            ? 'ordenado descendente'
                            : 'ordenado ascendente'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersList
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow key={row.id} hover tabIndex={-1}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.email}</TableCell>
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
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}>
                    <TableCell colSpan={3} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={usersList.length}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10]}
            onPageChange={handleChangePage}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default UsersListTable;
