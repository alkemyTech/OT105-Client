import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { IconButton } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from 'react-router-dom';
import '../../Styles/SlidesBackOffice.css';
import {
  StyledTableCell,
  StyledTableRow,
} from '../../Utils/SlidesBackOfficeStyled';

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
            {mockedData.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.Title}
                </StyledTableCell>
                <StyledTableCell align="right">{row.image}</StyledTableCell>
                <StyledTableCell align="right">{row.order}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    component={Link}
                    to={`/backoffice/Slides/edit/${row.id}`}
                    variant="outlined">
                    <EditIcon />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton onClick={() => deleteSlide(row)}>
                    {' '}
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SlidesBackOffice;
