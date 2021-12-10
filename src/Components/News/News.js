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
function createData(name, image, createdAt) {
  return { name, image, createdAt };
}

function News() {
  const [data, setData] = useState([
    createData('Frozen yoghurt', 'image1', '12/12/12'),
    createData('Ice cream sandwich', 'image2', '12/12/12'),
    createData('Eclair', 'image3', '12/2/12'),
    createData('Cupcake', 'image4', '12/5/12'),
    createData('Gingerbread', 'image5', '12/4/12'),
  ]);

  const tableBody =
    data && data.length
      ? data.map((row) => {
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
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton>
                  <DeleteIcon />
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
