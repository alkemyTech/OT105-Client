import { useState, useEffect } from 'react';
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
} from '@mui/material';

const exampleMembersData = {
  success: true,
  data: [
    {
      id: 258,
      name: 'Osvaldo Olivera',
      image: 'http://ongapi.alkemy.org/storage/kw2hNujhuq.jpeg',
      description: 'Presidente',
      facebookUrl: 'https://www.facebook.com/100075440371054/',
      linkedinUrl: 'https://www.linkedin.com/in/osvaldo-olivera-785b78226/',
      created_at: '2021-11-09T20:22:05.000000Z',
      updated_at: '2021-11-23T04:34:29.000000Z',
      deleted_at: null,
      group_id: null,
    },
    {
      id: 259,
      name: 'Nahuel Narváez',
      image: 'http://ongapi.alkemy.org/storage/z5x07SOhzl.jpeg',
      description: 'Secretario',
      facebookUrl: 'https://www.facebook.com/100075448260572/',
      linkedinUrl: 'https://www.linkedin.com/in/nahuel-narváez-099b89226/',
      created_at: '2021-11-09T23:25:38.000000Z',
      updated_at: '2021-11-23T04:18:18.000000Z',
      deleted_at: null,
      group_id: null,
    },
    {
      id: 261,
      name: 'Griselda Germán',
      image: 'http://ongapi.alkemy.org/storage/dR97wbZyUN.jpeg',
      description: 'Tesorera',
      facebookUrl: 'https://www.facebook.com/100074894726439/',
      linkedinUrl: 'https://www.linkedin.com/in/griselda-germán-137b83226/',
      created_at: '2021-11-10T00:32:23.000000Z',
      updated_at: '2021-11-23T04:31:58.000000Z',
      deleted_at: null,
      group_id: null,
    },
  ],
  message: 'Members retrieved successfully',
};

const membersMock = () => {
  return new Promise((res) => {
    setTimeout(() => res(exampleMembersData), 2000);
  });
};

const ScreenMembersList = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    membersMock().then((res) => {
      console.log(res.data);
      setMembers(res.data);
    });
  }, []);

  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
        <Typography align="center" variant="h2">
          Members
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Foto</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default ScreenMembersList;
