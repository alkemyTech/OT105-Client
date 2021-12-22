import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MemberRow from './MemberRow';
import { SearchMembersForm } from './SearchMembersForm';
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
  Fab,
  CircularProgress,
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
        <SearchMembersForm
          updateLoadingState={updateLoadingState}
          updateMembersList={updateMembersList}
        />
        <Box
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          sx={{ paddingInline: '1.3rem' }}>
          <Typography sx={{ marginBlock: '2rem' }} variant="h3">
            Miembros
          </Typography>
          <Link to="/backoffice/members/create">
            <Fab aria-label="add" color="primary">
              <AddIcon />
            </Fab>
          </Link>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">nombre</TableCell>
                <TableCell align="center">foto</TableCell>
                <TableCell align="center">acciones</TableCell>
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
