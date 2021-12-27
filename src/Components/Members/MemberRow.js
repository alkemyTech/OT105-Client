import React from 'react';
import { Avatar, Tooltip, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from '../../Styles/ScreenMembersListStyles';
import { StyledTableCell, StyledTableRow } from '../../Styles/TableStyles';
import '../../Styles/TablesStyles.css';
export const MemberRow = ({ id, name, image }) => {
  return (
    <StyledTableRow key={id} hover tabIndex={-1}>
      <StyledTableCell align="left" component="th" scope="row">
        {name}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Avatar alt={name} src={image} sx={styles.avatar} />
      </StyledTableCell>
      <StyledTableCell align="right">
        <Tooltip title="Editar">
          <IconButton
            // component={Link}
            // to={`/create-category/${row.id}`}
            variant="contained">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton
          // onClick={() => deletecategory(row.id)}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default MemberRow;
