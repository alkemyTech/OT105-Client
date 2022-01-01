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
  ButtonGroup,
  Box,
  Fab,
  CircularProgress,
  Alert,
} from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LoadSpinner from '../CommonComponents/LoaderSpinner';
import { getActivities } from '../../Services/ActivitiesServices';
import ActivitiesSearchForm from './ActivitiesSearchForm';
import s from '../../Styles/Categories/CategoriesList/Backoffice_ListCategories.module.css';
import { listHasValues } from '../../Utils';
import { StyledTableCell, StyledTableRow } from '../../Styles/TableStyles';
import { memberAvatarStyle } from '../../Styles/MembersList/MembersListInlineStyles';

function BackofficeListActivities() {
  const [activities, setActivities] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const rowHeight = 53;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const updateActivitiesList = (updatedActivities) => {
    setActivities(updatedActivities);
  };

  const deleteActiviti = (id) => {
    const isDelete = window.confirm(
      `Estas seguro de querer eliminar la tarea "${id}"`,
    );

    if (isDelete) {
      let result = activities.filter((e) => {
        return e.id !== id;
      });

      return setActivities(result);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getActivities().then((resp) => {
      setActivities(resp);
      setIsLoading(false);
    });
  }, []);

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
                    <TableCell>Nombre</TableCell>
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
                    {activities.map((row) => (
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
                            {row.created_at}
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
                                onClick={() => deleteActiviti(row.id)}>
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
