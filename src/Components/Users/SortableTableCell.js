import { Box, TableCell, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

const SortableTableCell = ({
  columnName,
  columnLabel,
  handleRequestSort,
  order,
  orderBy,
}) => {
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <TableCell sortDirection={orderBy === columnName ? order : false}>
      <TableSortLabel
        active={orderBy === columnName}
        direction={orderBy === columnName ? order : 'asc'}
        onClick={createSortHandler(columnName)}>
        {columnLabel}
        {orderBy === columnName ? (
          <Box component="span" sx={visuallyHidden}>
            {order === 'desc' ? 'ordenado descendente' : 'ordenado ascendente'}
          </Box>
        ) : null}
      </TableSortLabel>
    </TableCell>
  );
};

export default SortableTableCell;
