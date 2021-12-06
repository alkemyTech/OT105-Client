import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from 'react-router-dom';
import '../../Styles/SlidesBackOffice.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(title, image, order, edit, delet) {
  return { title, image, order, edit, delet };
}

const rows = [
  createData('Title 1', 'image 1', 'Order 1', <EditIcon />, <DeleteIcon />),
  createData('Title 2', 'image 2', 'Order 2', <EditIcon />, <DeleteIcon />),
  createData('Title 3', 'image 3', 'Order 3', <EditIcon />, <DeleteIcon />),
  createData('Title 4', 'image 4', 'Order 4', <EditIcon />, <DeleteIcon />),
];

function SlidesBackOffice() {
  return (
    <div style={{ height: 400, width: '900px', margin: '20px auto' }}>
      <Link exact className="link-button" to="/backoffice/Slides/create">
        Create a new slide
        <ArrowRightAltIcon />
      </Link>
      <TableContainer component={Paper}>
        <Table aria-label="customized table" sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="right">Image</StyledTableCell>
              <StyledTableCell align="right">Order</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.title}>
                <StyledTableCell component="th" scope="row">
                  {row.title}
                </StyledTableCell>
                <StyledTableCell align="right">{row.image}</StyledTableCell>
                <StyledTableCell align="right">{row.order}</StyledTableCell>
                <StyledTableCell align="right">{row.edit}</StyledTableCell>
                <StyledTableCell align="right">{row.delet}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SlidesBackOffice;
