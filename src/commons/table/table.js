import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}
  
function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}
  
  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { headCells, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}
    
EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

const CustomTable = ({headCells, data}) => {
    const navigate = useNavigate();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [page, setPage] = useState(0);
    const rowsPerPage = 5;

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return(
        <>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="Summary Table">
                    <EnhancedTableHead
                        headCells={headCells}
                        onRequestSort={handleRequestSort}
                        order={order}
                        orderBy={orderBy}
                    />
                        <TableBody>
                            {stableSort(data, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                <TableRow
                                    hover
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {console.log(row)}
                                    <TableCell component="th" scope="row">
                                        {row.device_id}
                                    </TableCell>
                                    <TableCell align="center">{row.device_type}</TableCell>
                                    <TableCell align="center">{row.timestamp}</TableCell>
                                    <TableCell align="center">{row.location}</TableCell>
                                    <TableCell align="center">
                                      <IconButton 
                                        aria-label="details"
                                        onClick={()=>navigate(`details/${row.device_id}`)}
                                      >
                                        <ArrowForwardIcon />
                                      </IconButton>
                                    </TableCell>
                                </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                />
            </Paper>
        </>
    )
}
export default CustomTable;