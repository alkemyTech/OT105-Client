import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MemberRow from './MemberRow';
import { MembersSearchForm } from './MembersSearchForm';
import styles from '../../Styles/ScreenMembersListStyles';
import {
  Alert,
  Typography,
  Container,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Box,
  Toolbar,
  Button,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import SortableTableCell from '../Users/SortableTableCell';
import { listHasValues } from '../../Utils';
import { deleteMember } from '../../Services/membersService';

const ScreenMembersList = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [members, setMembers] = useState([]);
  const [sortedMembersList, setSortedMembersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const rowsPerPage = 10;

  const matchesMobile = useMediaQuery('(min-width:430px)');

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }

    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const emptyRowsToAvoidLayoutJump =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - members.length) : 0;

  const rowHeight = 53;

  const isLastItemOnPage = () => {
    const total = members.length - 1;
    const pages = total / rowsPerPage;

    return page === pages && page !== 0;
  };

  const sortList = (list) => {
    const sortedList = list
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return sortedList;
  };

  useEffect(() => {
    const newSortedMembersList = sortList(members);

    setSortedMembersList(newSortedMembersList);
  }, [order, orderBy, page, members]);

  const updateLoadingState = (loadingState) => {
    setIsLoading(loadingState);
  };

  const updateMembersList = (updatedMembers) => {
    setMembers(updatedMembers);
  };

  const deletememberById = (id) => {
    deleteMember(id);
    const updatedMembers = members.filter((member) => member.id !== id);

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
        {!listHasValues(sortedMembersList) && !isLoading ? (
          <Alert
            severity="warning"
            sx={{ margin: '0 auto', justifyContent: 'center' }}>
            Miembro no encontrado!
          </Alert>
        ) : null}
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
                <SortableTableCell
                  columnLabel="Nombre"
                  columnName="name"
                  handleRequestSort={handleRequestSort}
                  order={order}
                  orderBy={orderBy}
                />
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
                {sortedMembersList.map((member) => (
                  <MemberRow
                    key={member.id}
                    deleteMember={deletememberById}
                    id={member.id}
                    image={member.image}
                    name={member.name}
                  />
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {!isLoading && (
          <TablePagination
            component="div"
            count={members.length}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10]}
            onPageChange={handleChangePage}
          />
        )}
      </Container>
    </>
  );
};

export default ScreenMembersList;
