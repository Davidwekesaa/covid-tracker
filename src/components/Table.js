import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import makeStyles from "@mui/material/styles/makeStyles";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import Tablee from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { commaSepareta } from "../services";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  root: {
    height: "30px",
  },

  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function Table({ statistics, filterCountry, hundleChange,setFilteringCountry }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="Table">
      <div className="input-cintainer">
        <div className="input-field">
          <div className="first-last-name">
            <div className="field-others">
              <input
                type="text"
                placeholder="filter by country"
                value={filterCountry}
                onChange={hundleChange}
                className="field"
                id="firstname"
              />
            </div>
          </div>
        </div>
      </div>
      <TableContainer component={Paper} className="tcontainer"  style={{ maxHeight: 220 }} >
        <Tablee sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Country</StyledTableCell>
              <StyledTableCell align="center">Continent&nbsp;</StyledTableCell>
              <StyledTableCell align="center">Population&nbsp;</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {(rowsPerPage > 0
              ? statistics?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : statistics
            )?.map((row) => (
              <StyledTableRow
                className="tableRow"
                key={Math.floor(Math.random() * 100000000000000000000000 + 1)}
                onClick={(e) => setFilteringCountry(e,row.country)}
              >
                <StyledTableCell component="th" scope="row">
                  {row.country}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.continent}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.population}
                </StyledTableCell>
                {/* <StyledTableCell align="center">
                  <div className="ceses">
                    <h6 className="new">
                      New : {row.cases.new ? row.cases.new : 0}
                    </h6>
                    <h6 className="active">
                      Active : {row.cases.active ? row.cases.active : 0}
                    </h6>
                    <h6 className="critical">
                      Critical : {row.cases.critical ? row.cases.critical : 0}
                    </h6>
                    <h6 className="recovered">
                      Recovered :{row.cases.recovered ? row.cases.recovered : 0}
                    </h6>
                  </div>
                </StyledTableCell> */}
                {/* <StyledTableCell align="center">
                  <div className="ceses">
                    <h6 className="new">
                      New : {row.deaths.new ? row.deaths.new : 0}
                    </h6>
                    <h6 className="total">
                      Total : {row.deaths.total ? row.deaths.total : 0}
                    </h6>
                  </div>
                </StyledTableCell> */}
                {/* <StyledTableCell align="center">
                  {row.tests.total ? row.tests.total : 0}
                </StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[
                  5,
                  50,
                  100,
                  150,
                  { label: "All", value: -1 },
                ]}
                colSpan={10}
                count={statistics?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Tablee>
      </TableContainer>
    </div>
  );
}

export default Table;
