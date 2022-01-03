import React, { useState, useEffect } from 'react';
import {
  Avatar,
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
import { getAllSlides, deleteSlide } from '../../Services/slidesService';

function SlidesBackOffice() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    getAllSlides().then((res) => setSlides(res.data));
  }, []);

  const deleteSlide = (row) => {
    const filterArray = slides.filter((slide) => slide.id !== row.id);

    return setSlides(filterArray);
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
                to="/backoffice/slides/create"
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
                  {slides.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        className="customTableCol">
                        <Avatar
                          alt={name}
                          src={row.image}
                          sx={{ width: 75, height: 75, margin: '0 auto' }}
                        />
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
                            to={`/backoffice/slides/edit/${row.id}`}
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
