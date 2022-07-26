import {
    Button, Grid, Container, LinearProgress, InputBase, Menu, MenuItem,
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
  
  import DeleteIcon from '@mui/icons-material/Delete'
  import InfoIcon from '@mui/icons-material/Info'
  import SearchIcon from '@mui/icons-material/Search'
  import { useSelector } from 'react-redux'
  
  import { useStyles } from './singleQuestionSet.style.js'
  import { TablePaginationActions } from '../../components/TablePagination/TablePaginationActions.js'
  import { SingleQuestionSetLogic } from './SingleQuestionSet.js'
  import Alerts from '../../components/Alerts'
  
  export default function SingleQuestionSet () {
    const { data: userData } = useSelector((state) => state.userLogin)
    const { token: userToken } = userData
  
    const classes = useStyles()
    const {
      loading,
      data,
      error,
      page,
      handleChangePage,
      handleChangeRowsPerPage,
      rowsPerPage,
      questionSetId,
      workerAnswers
    } = SingleQuestionSetLogic()


  console.log("hulululu", workerAnswers);
    return (
      <Container maxWidth='xl' style={{ width: '96%' }}>
        <Typography variant='h4' style={{ margin: '0.5rem 0 2rem 0' }}>
          Question Set {'>'} Questions
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
                  placeholder='Search by name…'
                  classes={{ input: classes.inputInput }}
                  inputProps={{ 'aria-label': 'search' }}
                  // onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </button>
            <Typography variant='p' style={{ fontSize: '0.88rem' }}>
              Searching among {rowsPerPage === -1 ? 'All' : 'first ' + rowsPerPage} results
              <div className={classes.tooltip}>
                <InfoIcon className={classes.infoIcon} />
                <span id='tool' className={classes.tooltiptext}>
                  Search among more data by changing the Row per Page value at the end of
                  the table
                </span>
              </div>
            </Typography>
          </Grid>
          <Grid item md={9}>
            <Button variant='contained' size='small' className={classes.sortAndExportBtn}>Sort</Button>
            <Menu
              id='menu-appbar'
              // anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              // open={Boolean(anchorEl)}
              // onClose={handleCloseSort}
            >
              {/* <MenuItem onClick={() => handleSorting('asc')}>Name Ascending</MenuItem>
              <MenuItem onClick={() => handleSorting('desc')}>Name Descending</MenuItem>
              <MenuItem onClick={() => handleSorting('timeAsc')}>Time Ascending</MenuItem>
              <MenuItem onClick={() => handleSorting('timeDesc')}>Time Descending</MenuItem> */}
            </Menu>
          </Grid>
        </Grid>
  
        {/* Table starts */}
        <br />
        <br />
        {error && (
          <Alerts severity='error' info='Something went Wrong !, Please Login Again' />
        )}
        <TableContainer component={Paper} className={classes.tableContainer}>
          {loading && <LinearProgress style={{ margin: '4px auto' }} color='primary' />}
          <Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
            <TableHead>
              <TableCell
                style={{ paddingTop: '1.3rem', paddingBottom: '1.3rem' }}
                className={classes.tableHeading}
              >
                Serial No.
              </TableCell>
              <TableCell className={classes.tableHeading}>
                Creation Date
              </TableCell>
              <TableCell className={classes.tableHeading}>Creation Time</TableCell>
              <TableCell className={classes.tableHeading}>{data && data.body.querry && data.body.querry[0].question}</TableCell>
              <TableCell className={classes.tableHeading} align='center'>
                Worker Name
              </TableCell>
              <TableCell className={classes.tableHeading} align='center'>
                View Details
              </TableCell>
            </TableHead>
            <TableBody>
              {data && data.body.querry[0] && data.body.querry[0].answer && data.body.querry[0].answer.map((row, index) => (

                <TableRow>
                  <TableCell className={classes.tableCell_id}>
                    {index + 1}
                  </TableCell>
                  <TableCell
                    align='justify'
                    component='th'
                    className={classes.tableCell_userName}
                  >
                    {row.updatedAt instanceof Date
                      ? row.updatedAt.toLocaleDateString()
                      : new Date(row.updatedAt).toLocaleDateString()}{' '}
                  </TableCell>
                  <TableCell
                    align='justify'
                    component='th'
                    className={classes.tableCell_userName}
                  >
                    {row.updatedAt instanceof Date
                      ? row.updatedAt.toLocaleTimeString()
                      : new Date(row.updatedAt).toLocaleTimeString()}{' '}
                  </TableCell>
                  <TableCell
                    align='justify'
                    component='th'
                    className={classes.tableCell_date}
                  >
                    {(data && data.body.querry && data.body.querry[0].dataType) === "text" ?   row.data[0] : <img src={row.data[0]} alt="image" style={{width: "100px", height: "100px"}}/>}
                  </TableCell>

                  <TableCell
                    align='justify'
                    component='th'
                    className={classes.tableCell_date}
                  >
                    {row.worker.workerName === null ? "No name" : row.worker.workerName}
                    </TableCell>
                  <TableCell align='center'>
                    <a
                      href={`/question-set/answer/${questionSetId}/${row.worker._id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        variant='contained'
                        color='primary'
                        className={classes.editBtn}
                        size='small'
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
  