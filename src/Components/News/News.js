import React, { useState } from 'react';
import {
  Box,
  Toolbar,
  Typography,
  Tooltip,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { NewsSearch_Form } from './NewsSearch_Form';
import s from '../../Styles/Categories/CategoriesList/Backoffice_ListCategories.module.css';
import { StyledTableCell, StyledTableRow } from '../../Styles/TableStyles';
import { memberAvatarStyle } from '../../Styles/MembersList/MembersListInlineStyles';

function News() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const editNews = (id) => {
    const isedit = window.confirm(
      `Estas seguro de querer editar la categoria "${id}"`,
    );
  };

  const tableBody =
    news && news.length
      ? news.map((row) => {
          return (
            <StyledTableRow key={row.name} hover tabIndex={-1}>
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
              <StyledTableCell align="right">{row.created_at}</StyledTableCell>
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
        })
      : null;

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
                Usuarios
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
                    <TableCell>Nombre</TableCell>
                    <TableCell align="center">Imagen</TableCell>
                    <TableCell align="center">Creado</TableCell>
                    <TableCell align="right">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{tableBody}</TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}
export default News;
