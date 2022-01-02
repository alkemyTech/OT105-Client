import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Toolbar,
  Typography,
  Tooltip,
  ListItemAvatar,
  Avatar,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { NewsSearch_Form } from './NewsSearch_Form';
import { StyledTableCell, StyledTableRow } from '../../Styles/TableStyles';
import SortableTableCell from '../Users/SortableTableCell';
import { memberAvatarStyle } from '../../Styles/MembersList/MembersListInlineStyles';
import { sliceDate } from '../../Utils';
import s from '../../Styles/Categories/CategoriesList/Backoffice_ListCategories.module.css';

function News() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [news, setNews] = useState([]);
  const [sortedNewsList, setSortedNewsList] = useState([]);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - news.length) : 0;

  const rowHeight = 53;

  const isLastItemOnPage = () => {
    const total = news.length - 1;
    const pages = total / rowsPerPage;

    return page === pages && page !== 0;
  };

  const sortList = (list) => {
    const sortedList = list
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return sortedList;
  };

  useEffect(() => {
    const newSortedUsersList = sortList(news);

    setSortedNewsList(newSortedUsersList);
  }, [order, orderBy, page, news]);

  const updateLoadingState = (loadingState) => {
    setIsLoading(loadingState);
  };

  const updateNewsList = (updatedNews) => {
    setNews(updatedNews);
  };

  const deleteNews = (id) => {
    const isDelete = window.confirm(
      `Estas seguro de querer eliminar la categoria "${id}"`,
    );

    if (isDelete) {
      let result = news.filter((e) => {
        return e.id !== id;
      });

      return setNews(result);
    }
  };

  return (
    <div className={s.listContainer}>
      <h1 style={{ textAlign: 'center' }}>Novedades</h1>
      <NewsSearch_Form
        updateLoadingState={updateLoadingState}
        updateNewsList={updateNewsList}
      />
      <Container sx={{ my: '1rem' }}>
        <Box>
          <Paper>
            <Toolbar sx={{ backgroundColor: '#e1e1e1' }}>
              <Typography component="div" sx={{ mr: 'auto' }} variant="h6">
                Novedades
              </Typography>
              <Button
                className="customTableBtn"
                component={Link}
                to="/backoffice/news/create"
                variant="contained">
                Nueva novedad
              </Button>
            </Toolbar>
            <TableContainer component={Paper}>
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
                <TableBody>
                  {sortedNewsList.map((row) => {
                    return (
                      <StyledTableRow key={row.id} hover tabIndex={-1}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <ListItemAvatar sx={{ marginTop: 0 }}>
                            <Avatar
                              alt={row.name}
                              src={row.image}
                              sx={memberAvatarStyle}
                            />
                          </ListItemAvatar>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {sliceDate(row.created_at)}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Tooltip title="Editar">
                            <IconButton
                              component={Link}
                              to={`/backoffice/users/edit/${row.id}`}
                              variant="contained">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar">
                            <IconButton onClick={() => deleteNews(row.id)}>
                              <DeleteIcon color="error" />
                            </IconButton>
                          </Tooltip>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {!isLoading && (
              <TablePagination
                component="div"
                count={news.length}
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
export default News;
