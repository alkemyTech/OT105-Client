import { useState } from 'react';
import { Link } from 'react-router-dom';
import MemberRow from './MemberRow';
import { MembersSearchForm } from './MembersSearchForm';
import styles from '../../Styles/ScreenMembersListStyles';
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
  Box,
  Toolbar,
  Button,
  CircularProgress,
  TablePagination,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

const ScreenMembersList = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateLoadingState = (loadingState) => {
    setIsLoading(loadingState);
  };

  const updateMembersList = (updatedMembers) => {
    setMembers(updatedMembers);
  };

  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
        <Typography align="center" sx={{ marginBlock: '2rem' }} variant="h3">
          Miembros
        </Typography>
        <Box
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          sx={{ paddingInline: '1.3rem', paddingBlock: '2rem' }}>
          <MembersSearchForm
            updateLoadingState={updateLoadingState}
            updateMembersList={updateMembersList}
          />
        </Box>
        <Toolbar sx={{ backgroundColor: '#e1e1e1' }}>
          <Typography
            component="div"
            id="tableTitle"
            sx={{ mr: 'auto' }}
            variant="h6">
            Miembros
          </Typography>
          <Button
            className="customTableBtn"
            component={Link}
            to={`/backoffice/members/create`}
            variant="contained">
            Añadir miembro
          </Button>
        </Toolbar>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Nombre</TableCell>
                <TableCell align="center">Foto</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            {isLoading ? (
              <caption>
                <Box sx={styles.progressBox}>
                  <CircularProgress />
                </Box>
              </caption>
            ) : (
              <TableBody>
                {members.map((member) => (
                  <MemberRow
                    key={member.id}
                    image={member.image}
                    name={member.name}
                  />
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default ScreenMembersList;
