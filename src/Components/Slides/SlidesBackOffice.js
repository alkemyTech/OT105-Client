import React, { useState } from 'react';
import {
  Table,
  Container,
  Box,
  Toolbar,
  Typography,
  Button,
  TableCell,
  Tooltip,
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import { IconButton } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import '../../Styles/SlidesBackOffice.css';
import {
  StyledTableCell,
  StyledTableRow,
} from '../../Utils/SlidesBackOfficeStyled';
import s from '../../Styles/Categories/CategoriesList/Backoffice_ListCategories.module.css';

function SlidesBackOffice() {
  const [mockedData, setMockedData] = useState([
    {
      id: 1,
      Title: 'Title 1',
      image: 'Image 1',
      order: 'Order 1',
    },
    {
      id: 2,
      Title: 'Title 2',
      image: 'Image 2',
      order: 'Order 2',
    },
    {
      id: 3,
      Title: 'Title 3',
      image: 'Image 3',
      order: 'Order 3',
    },
    {
      id: 4,
      Title: 'Title 4',
      image: 'Image 4',
      order: 'Order 4',
    },
  ]);
  const deleteSlide = (row) => {
    const filterArray = mockedData.filter((slide) => slide.id !== row.id);

    return setMockedData(filterArray);
  };

  return (
    <div className={s.listContainer}>
      <h1 style={{ textAlign: 'center' }}>Slides</h1>
      <Container sx={{ my: '1rem' }}>
        <Box>
          <Paper>
            <Toolbar sx={{ backgroundColor: '#e1e1e1' }}>
              <Typography
                className="customTableTitle"
                component="div"
                sx={{ mr: 'auto' }}
                variant="h6">
                Slides
              </Typography>
              <Button
                className="customTableBtn"
                component={Link}
                to="/backoffice/users/create"
                variant="contained">
                Nuevo slide
              </Button>
            </Toolbar>
            <TableContainer>
              <Table
                aria-labelledby="tableTitle"
                size="small"
                sx={{ maxWidth: 900 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Titulo</TableCell>
                    <TableCell align="center" className="customTableCol">
                      Imagen
                    </TableCell>
                    <TableCell align="center" className="customTableCol">
                      Orden
                    </TableCell>
                    <TableCell align="right">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockedData.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row.Title}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        className="customTableCol">
                        {row.image}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        className="customTableCol">
                        {row.order}
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
                          <IconButton onClick={() => console.log(row.id)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}

export default SlidesBackOffice;
