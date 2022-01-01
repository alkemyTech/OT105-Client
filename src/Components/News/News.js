import React, { useState } from 'react';
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
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { NewsSearch_Form } from './NewsSearch_Form';

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
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.image}</TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
              <TableCell align="right">
                <IconButton>
                  <Button
                    href={`/create-category/${row.id}`}
                    startIcon={<EditIcon color="primary" />}
                    variant="outlined"
                    onClick={() => editNews(row.id)}
                  />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton>
                  <Button
                    startIcon={<DeleteIcon color="primary" />}
                    variant="outlined"
                    onClick={() => deleteNews(row.id)}
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })
      : null;

  return (
    <Container className="container-table" maxWidth="md">
      <Grid container justifyContent="flex-end">
        <Link to="/backoffice/news/create">
          <Button variant="contained">+ New</Button>
        </Link>
      </Grid>
      <NewsSearch_Form
        updateLoadingState={updateLoadingState}
        updateNewsList={updateNewsList}
      />

      <TableContainer component={Paper}>
        <Table aria-label="simple table" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>News</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Created at</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableBody}</TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
export default News;
