import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Container,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Button,
  ButtonGroup,
  Box,
  Fab,
  CircularProgress,
} from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { ActivitiesSearchForm } from './ActivitiesSearchForm';

let activitiesMock = [
  {
    id: 2,
    name: 'Titulo de prueba',
    image: 'imagen de prueba',
    createdAt: '01/05/2021',
  },
  {
    id: 1,
    name: 'Titulo de prueba',
    image: 'imagen de prueba',
    createdAt: '01/05/2021',
  },
  {
    id: 3,
    name: 'Titulo de prueba',
    image: 'imagen de prueba',
    createdAt: '01/05/2021',
  },
];

function BackofficeListActivities() {
  const [activities, setActivities] = useState(activitiesMock);

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

  return (
    <div>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        sx={{ paddingInline: '1.3rem' }}>
        <Typography sx={{ marginBlock: '2rem' }} variant="h3">
          Actividades
        </Typography>
        <Link to="/backoffice/activities/create">
          <Fab aria-label="add" color="primary">
            <AddIcon />
          </Fab>
        </Link>
      </Box>
      <ActivitiesSearchForm
        // updateLoadingState={updateLoadingState}
        updateActivitiesList={updateActivitiesList}
      />
      <TableContainer component={Paper}>
        <Table aria-label="caption table" sx={{ minWidth: 650 }}>
          <caption>A basic table example with a caption</caption>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">createdAt</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((row) => (
              <>
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.image}</TableCell>
                  <TableCell align="right">{row.createdAt}</TableCell>
                  <TableCell align="right">
                    <Link to={`/balckoffice/activities/create/${row.id}`}>
                      <Button
                        startIcon={<AutoFixHighIcon />}
                        variant="outlined"
                      />
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      startIcon={<DeleteIcon />}
                      variant="outlined"
                      onClick={() => deleteActiviti(row.id)}
                    />
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default BackofficeListActivities;
