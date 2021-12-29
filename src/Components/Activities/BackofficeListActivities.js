import React, { useState, useEffect } from 'react';
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
import { getActivities } from '../../Services/ActivitieService';

function BackofficeListActivities() {
  const [activities, setActivities] = useState([{}]);
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
    getActivities().then((resp) => {
      setActivities(resp);
    });
  }, []);

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
                  <TableCell align="right">{row.created_at}</TableCell>
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
