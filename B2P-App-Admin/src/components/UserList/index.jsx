import React from 'react'
import clsx from 'clsx'
import { CSVLink } from 'react-csv'
import {
  Button,
  Grid,
  Container,
  LinearProgress,
  Box,
  TextField,
  InputBase,
  Modal,
  Backdrop,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  TableHead,
  Typography,
  MenuItem,
  Menu
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import InfoIcon from '@mui/icons-material/Info'
import SearchIcon from '@mui/icons-material/Search'
import { useSelector } from 'react-redux'

import { useStyles } from './userList.style'
import { TablePaginationActions } from '../TablePagination/TablePaginationActions.js'
import { UserListLogic } from './UserList.js'
import Alerts from '../Alerts/index.jsx'

export default function UserList ({ userType }) {
  const { data } = useSelector((state) => state.userLogin)
  const { token: userToken } = data
  const classes = useStyles()
  const {
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    rowsPerPage,
    userRows,
    loading,
    editUserPassword,
    setNewPassword,
    open,
    setOpen,
    handleOpen,
    handleClose,
    deleteUser,
    error,
    setSearchTerm,
    filterSearch,
    csvData,
    anchorEl,
    handleMenu,
    sortedData,
    handleCloseSort,
    handleSorting
  } = UserListLogic(userType)
  console.log(userRows)
  return (
    <Container maxWidth='xl' style={{ width: '96%' }}>
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
                placeholder='Search…'
                classes={{ input: classes.inputInput }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setSearchTerm(e.target.value)}
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
        {/* Sort & Export btn */}
        <Grid item md={9}>
          <Button
            variant='contained'
            size='small'
            onClick={handleMenu}
            className={classes.sortAndExportBtn}
          >
            Sort
          </Button>
          <Menu
            id='menu-appbar'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            open={Boolean(anchorEl)}
            onClose={handleCloseSort}
          >
            <MenuItem onClick={() => handleSorting('asc')}>Name Ascending</MenuItem>
            <MenuItem onClick={() => handleSorting('desc')}>Name Descending</MenuItem>
            <MenuItem onClick={() => handleSorting('timeAsc')}>Time Ascending</MenuItem>
            <MenuItem onClick={() => handleSorting('timeDesc')}>Time Descending</MenuItem>
          </Menu>

          <Button
            variant='contained'
            size='small'
            style={{ float: 'right' }}
            className={classes.sortAndExportBtn}
          >
            <CSVLink
              filename='B2P-All-Users.csv'
              className={classes.sortAndExportBtn_csvTag}
              data={csvData}
            >
              Export Users
            </CSVLink>
          </Button>
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
              Id
            </TableCell>
            <TableCell className={classes.tableHeading}>Username</TableCell>
            <TableCell className={classes.tableHeading}>Password</TableCell>
            <TableCell className={classes.tableHeading}>Registration Date</TableCell>
            <TableCell className={classes.tableHeading} align='center'>
              Edit password
            </TableCell>
            <TableCell className={classes.tableHeading} align='center'>
              Delete
            </TableCell>
          </TableHead>
          <TableBody>
            {sortedData && (sortedData && rowsPerPage > 0
              ? sortedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter((val) => filterSearch(val))
              : sortedData.filter((val) => filterSearch(val))
            ).map((userRow) => (
              <TableRow key={userRow.adminName}>
                <TableCell className={classes.tableCell_id}>{userRow._id}</TableCell>
                <TableCell
                  align='justify'
                  component='th'
                  className={classes.tableCell_userName}
                >
                  {userType === 'admin'
                    ? userRow.adminName
                    : userType === 'client'
                      ? userRow.clientName
                      : userRow.workerName}
                </TableCell>
                <TableCell className={classes.tableCell_password}>{(userRow.password).substring(0, 15)}</TableCell>
                <TableCell
                  align='justify'
                  component='th'
                  className={classes.tableCell_date}
                >
                  {userRow.createdAt instanceof Date
                    ? userRow.createdAt.toLocaleDateString()
                    : new Date(userRow.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell align='center'>
                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.editBtn}
                    size='small'
                    onClick={handleOpen}
                  >
                    Edit
                  </Button>
                  <Modal
                    aria-labelledby='transition-modal-title'
                    aria-describedby='transition-modal-description'
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 600
                    }}
                  >
                    <Box in={open} className={classes.paper}>
                      <div>
                        <Typography
                          style={{ marginTop: '1vw' }}
                          variant='h4'
                          color='primary'
                          id='transition-modal-title'
                        >
                          Edit Password
                        </Typography>
                        <p id='transition-modal-description'>
                          <TextField
                            type='password'
                            required
                            placeholder='Change Password'
                            fullWidth
                            variant='outlined'
                            className={classes.margin}
                            onChange={(e) => {
                              setNewPassword(e.target.value)
                            }}
                          />
                          <br />
                          <Button
                            type='submit'
                            variant='contained'
                            color='primary'
                            onClick={() => editUserPassword(userRow._id, userToken)}
                            className={classes.editPopupBtn}
                          >
                            Submit
                          </Button>
                          <Button
                            onClick={() => setOpen(false)}
                            className={clsx(
                              classes.editPopupBtn,
                              classes.editPopupBtn_cancel
                            )}
                          >
                            Cancel
                          </Button>
                        </p>
                      </div>
                    </Box>
                  </Modal>
                </TableCell>
                <TableCell align='center'>
                  <Typography
                    variant='h6'
                    className={classes.headingFont}
                    style={{ textAlign: 'center' }}
                  >
                    <Button
                      onClick={() => {
                        deleteUser(userRow._id, userToken)
                      }}
                    >
                      <DeleteIcon className={classes.deleteIcon} />
                    </Button>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={userRows.length}
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
