import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledTableCell, StyledTableRow } from '../../../Styles/TableStyles';
import '../../../Styles/CustomTableStyles/CustomTable3Cols.css';
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  TableCell,
  IconButton,
  Tooltip,
  TablePagination,
} from '@mui/material';

const CustomTable3Cols = ({
  list,
  tableTitle,
  newItemBtnText,
  editItemURL,
  deleteItemFn,
  firstColMethod,
  secondColMethod,
  firstColName,
  secondColName,
}) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRowsToAvoidLayoutJump =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

  const rowHeight = 53;

  return (
    <Container sx={{ my: '1rem' }}>
      <Box>
        <Paper>
          <Toolbar sx={{ backgroundColor: '#e1e1e1' }}>
            <Typography
              component="div"
              id="tableTitle"
              sx={{ mr: 'auto' }}
              variant="h6">
              {tableTitle}
            </Typography>
            <Button
              className="customTableBtn"
              component={Link}
              to="/create-category"
              variant="contained">
              {newItemBtnText}
            </Button>
          </Toolbar>
          <TableContainer component={Paper}>
            <Table aria-label="tableTitle" sx={{ maxWidth: 900 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">{firstColName}</TableCell>
                  <TableCell align="center" className="customTableCol">
                    {secondColName}
                  </TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((row) => (
                  <StyledTableRow key={row.id} hover tabIndex={-1}>
                    <StyledTableCell component="th" scope="row" align="left">
                      {row[firstColMethod]}
                    </StyledTableCell>
                    <StyledTableCell align="center" className="customTableCol">
                      {row[secondColMethod]}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Tooltip title="Editar">
                        <IconButton
                          component={Link}
                          to={`/${editItemURL}/${row.id}`}
                          variant="contained">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton onClick={() => deleteItemFn(row.id)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                {emptyRowsToAvoidLayoutJump > 0 && (
                  <TableRow
                    style={{
                      height: rowHeight * emptyRowsToAvoidLayoutJump,
                    }}>
                    <TableCell colSpan={3} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={list.length}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10]}
            onPageChange={handleChangePage}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default CustomTable3Cols;
