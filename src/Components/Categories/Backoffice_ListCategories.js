import React, { useState } from 'react';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../FormStyles.css';
import { StyledTableCell, StyledTableRow } from '../../Styles/TableStyles';

const categoriesMock = [
  {
    id: 2,
    name: 'Name de prueba',
    createdAt: '03/12/2021',
  },
  {
    id: 1,
    name: 'Name de prueba',
    createdAt: '03/12/2021',
  },
  {
    id: 3,
    name: 'Name de prueba',
    createdAt: '03/12/2021',
  },
];

const Backoffice_ListCategories = () => {
  const [categories, setCategories] = useState(categoriesMock);
  const deletecategory = (id) => {
    const isDelete = window.confirm(
      `Estas seguro de querer eliminar la tarea "${id}"`,
    );

    if (isDelete) {
      let result = categories.filter((e) => {
        return e.id !== id;
      });

      return setCategories(result);
    }
  };

  return (
    <div className="list-container">
      <TableContainer component={Paper}>
        <Table aria-label="caption table" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">CreatedAt</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  color="error"
                  href="/backoffice/categories/create"
                  variant="contained">
                  Create
                </Button>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.createdAt}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    startIcon={<EditIcon color="primary" />}
                    variant="outlined"
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    startIcon={<DeleteIcon color="primary" />}
                    variant="outlined"
                    onClick={() => deletecategory(row.id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Backoffice_ListCategories;
