import swal from 'sweetalert'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../redux/actions/userActions.js'
import { useEffect, useState } from 'react'
import { editUserPasswordHelper, deleteUserHelper } from './helper'

export const UserListLogic = (userType) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const { loading, data, error } = useSelector((state) => state.viewUser)

  const adminRows = []
  const clientRows = []
  const workerRows = []
  let userRows = []

  data &&
    data.message &&
    data.message.map((oneData) =>
      oneData.isAdmin
        ? adminRows.push(oneData)
        : oneData.isClient
          ? clientRows.push(oneData)
          : workerRows.push(oneData)
    )

  if (userType === 'admin') {
    userRows = adminRows
  } else if (userType === 'client') {
    userRows = clientRows
  } else {
    userRows = workerRows
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  // Search
  const [searchTerm, setSearchTerm] = useState('')

  function filterSearch (val) {
    const nameValue =
      userType === 'admin'
        ? val.adminName
        : userType === 'client'
          ? val.clientName
          : val.workerName
    if (searchTerm === '') {
      return val
    } else if (nameValue.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val
    }
  }

  // Sort
  const [sortType, setSortType] = useState('asc')
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseSort = () => {
    setAnchorEl(null)
  }

  const sortedData = userRows.sort((a, b) => {
    const isReversed = sortType === 'asc' || sortType === 'timeAsc' ? 1 : -1
    const userA =
      userType === 'admin'
        ? a.adminName
        : userType === 'client'
          ? a.clientName
          : a.workerName
    const userB =
      userType === 'admin'
        ? b.adminName
        : userType === 'client'
          ? b.clientName
          : b.workerName
    return sortType === 'asc' || sortType === 'desc'
      ? isReversed * userA.localeCompare(userB)
      : isReversed * a.createdAt.localeCompare(b.createdAt)
  })

  function handleSorting (sortSelected) {
    setSortType(sortSelected)
    setAnchorEl(null)
  }

  // CSV Export
  const csvData = [['Id', 'Username', 'Registration Date']]
  data &&
    data.message.map((report) =>
      csvData.push([
        report._id,
        report.isAdmin
          ? report.adminName
          : report.isClient
            ? report.clientName
            : report.workerName,
        report.createdAt
      ])
    )

  // For edit popup
  const [open, setOpen] = useState(false)
  const [newPassword, setNewPassword] = useState('')

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  // Edit User Password
  const editUserPassword = async (id, token) => {
    await editUserPasswordHelper(id, token, newPassword)
      .then(() => {
        console.log('Sent to helper')
      })
      .catch(() => console.log('Not able to send to helper'))
    setOpen(false)
  }

  // Delete User
  const deleteUser = async (id, token) => {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure that you want to delete the user?',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(async (willDelete) => {
      if (willDelete) {
        // delete user
        await deleteUserHelper(id, token)
        swal('Deleted!', 'User has been deleted!', 'success')
        dispatch(getAllUsers())
      } else {
        swal('User was not deleted!')
      }
    })
  }

  return {
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    rowsPerPage,
    setRowsPerPage,
    userRows,
    loading,
    editUserPassword,
    open,
    setOpen,
    handleOpen,
    handleClose,
    setNewPassword,
    deleteUser,
    error,
    setSearchTerm,
    filterSearch,
    csvData,
    anchorEl,
    handleMenu,
    sortedData,
    handleCloseSort,
    handleSorting,
    clientRows,
    adminRows,
    workerRows
  }
}
