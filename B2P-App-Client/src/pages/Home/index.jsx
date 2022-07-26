import { Button, Grid, Container, LinearProgress, InputBase, Menu, MenuItem } from '@mui/material'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  TableHead,
  Typography
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import SearchIcon from '@mui/icons-material/Search'

import { useStyles } from './questionSet.style.js'
import { TablePaginationActions } from '../../components/TablePagination/TablePaginationActions.js'
import { HomeLogic } from './Home.js'
import Alerts from '../../components/Alerts'

function Home () {
 
    const classes = useStyles()
    const {
      loading,
      data,
      error,
      page,
      handleChangePage,
      handleChangeRowsPerPage,
      rowsPerPage,
      setSearchTerm,
      filterSearch,
      anchorEl,
      handleMenu,
      sortedQuestionSets,
      handleCloseSort,
      handleSorting,
    } = HomeLogic()
  
    return (
      <Container maxWidth="xl" style={{ width: '96%' }}>
        <Typography variant="h4" style={{ margin: '0.5rem 0 2rem 0' }}>
          Question Set List
        </Typography>
        {/* Buttons part */}
        <Grid container spacing={0}>
          <Grid item md={3}>
            <button className={classes.buttonsTable_inputButton}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  style={{ width: '90%', marginLeft: '2rem' }}
                  placeholder="Search by name…"
                  classes={{ input: classes.inputInput }}
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </button>
            <Typography variant="p" style={{ fontSize: '0.88rem' }}>
              Searching among {rowsPerPage === -1 ? 'All' : 'first ' + rowsPerPage} results
              <div className={classes.tooltip}>
                <InfoIcon className={classes.infoIcon} />
                <span id="tool" className={classes.tooltiptext}>
                  Search among more data by changing the Row per Page value at the end of
                  the table
                </span>
              </div>
            </Typography>
          </Grid>
          <Grid item md={9}>
            <Button variant="contained" size="small" onClick={handleMenu} className={classes.sortAndExportBtn}>Sort</Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorEl)}
              onClose={handleCloseSort}
            >
              <MenuItem onClick={() => handleSorting("asc")}>Name Ascending</MenuItem>
              <MenuItem onClick={() => handleSorting("desc")}>Name Descending</MenuItem>
              <MenuItem onClick={() => handleSorting("timeAsc")}>Time Ascending</MenuItem>
              <MenuItem onClick={() => handleSorting("timeDesc")}>Time Descending</MenuItem>
            </Menu>
          </Grid>
        </Grid>
  
        {/* Table starts */}
        <br />
        <br />
        {error && (
          <Alerts severity="error" info={'Something went Wrong !, Please Login Again'} />
        )}
        <TableContainer component={Paper} className={classes.tableContainer}>
          {loading && <LinearProgress style={{ margin: '4px auto' }} color="primary" />}
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableCell
                style={{ paddingTop: '1.3rem', paddingBottom: '1.3rem' }}
                className={classes.tableHeading}
              >
                Question Set Name
              </TableCell>
              <TableCell className={classes.tableHeading}>
                No. Of Clients Assigned
              </TableCell>
              <TableCell className={classes.tableHeading}>No of Workers Assigned</TableCell>
              <TableCell className={classes.tableHeading}>Created/Updated at</TableCell>
              <TableCell className={classes.tableHeading} align="center">
                View Details
              </TableCell>
            </TableHead>
            <TableBody>
              {sortedQuestionSets && (sortedQuestionSets && rowsPerPage > 0 && sortedQuestionSets
                ? sortedQuestionSets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter((val) => filterSearch(val))
                :
                sortedQuestionSets.filter((val) => filterSearch(val))
              ).map((questionRow) => (
                  <TableRow>
                    <TableCell className={classes.tableCell_id}>
                      {questionRow.setName}
                    </TableCell>
                    <TableCell
                      align="justify"
                      component="th"
                      className={classes.tableCell_userName}
                    >
                      {questionRow.client.length}
                    </TableCell>
                    <TableCell
                      align="justify"
                      component="th"
                      className={classes.tableCell_userName}
                    >
                      {questionRow.worker.length}
                    </TableCell>
                    <TableCell
                      align="justify"
                      component="th"
                      className={classes.tableCell_date}
                    >
                      {questionRow.updatedAt instanceof Date
                        ? questionRow.updatedAt.toLocaleDateString()
                        : new Date(questionRow.updatedAt).toLocaleDateString()}{' '}
                    </TableCell>
                    <TableCell align="center">
                      <a
                        href={`/question-set/${questionRow._id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.editBtn}
                          size="small"
                        >
                          View
                        </Button>
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={data && data.body.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page'
                    },
                    native: true
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    )
  }
  

export default Home
