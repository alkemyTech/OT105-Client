import React from 'react';
import {
  TableRow,
  TableCell,
  Typography,
  Avatar,
  Button,
  ButtonGroup,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import styles from '../../Styles/ScreenMembersListStyles';

export const MemberRow = ({ name, image }) => {
  return (
    <TableRow>
      <TableCell align="center">
        <Typography color="initial" variant="h5">
          {name}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Avatar alt={name} src={image} sx={styles.avatar} />
      </TableCell>
      <TableCell align="center">
        <ButtonGroup
          aria-label="outlined primary button group"
          size="small"
          variant="text">
          <Button startIcon={<EditIcon />}>Editar</Button>
          <Button startIcon={<DeleteIcon />}>Eliminar</Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
};

export default MemberRow;
