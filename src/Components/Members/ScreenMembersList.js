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
  useMediaQuery,
} from '@mui/material';

const ScreenMembersList = () => {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const matchesMobile = useMediaQuery('(min-width:430px)');

  const updateLoadingState = (loadingState) => {
    setIsLoading(loadingState);
  };

  const updateMembersList = (updatedMembers) => {
    setMembers(updatedMembers);
  };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          marginTop: '2rem',
          ['@media (min-width:992px)']: {
            width: '60%',
          },
        }}>
        <h1 style={{ textAlign: 'center' }}>Miembros</h1>
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
                {matchesMobile && <TableCell align="center">Foto</TableCell>}
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
