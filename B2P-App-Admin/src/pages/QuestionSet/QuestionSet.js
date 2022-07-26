import swal from 'sweetalert'
import { useDispatch, useSelector } from 'react-redux'
import { getAllQuestions } from '../../redux/actions/questionActions.js'
import { useEffect, useState } from 'react'
import { deleteUserHelper } from './helper'

export const QuestionSetLogic = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')

  const { loading, data, error } = useSelector((state) => state.viewQuestion)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllQuestions())
  }, [dispatch])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Delete User
  const deleteQuestion = async (id, token) => {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure that you want to delete this question?',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(async (willDelete) => {
      if (willDelete) {
        // delete user
        await deleteUserHelper(id, token)
        swal('Deleted!', 'Question has been deleted!', 'success')
        dispatch(getAllQuestions())
      } else {
        swal('Question was not deleted!')
      }
    })
  }

  // Search
  function filterSearch (val) {
    if (searchTerm === '') {
      return val
    } else if (val.setName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val
    }
  }

  // const paginatedData =
  //   rowsPerPage > 0
  //     ? questionSets
  //         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  //         .filter((val) => filterSearch(val))
  //     : questionSets.filter((val) => filterSearch(val))

  // Sort
  const [sortType, setSortType] = useState('asc')
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseSort = () => {
    setAnchorEl(null)
  }

  const questionSets = data ? data.body : []
  console.log(questionSets)

  const sortedQuestionSets = questionSets.sort((a, b) => {
    const isReversed = sortType === 'asc' || sortType === 'timeAsc' ? 1 : -1
    console.log(a)
    return sortType === 'asc' || sortType === 'desc'
      ? isReversed * a.setName.localeCompare(b.setName)
      : isReversed * a.createdAt.localeCompare(b.createdAt)
  })

  function handleSorting (sortSelected) {
    setSortType(sortSelected)
    setAnchorEl(null)
  }

  return {
    loading,
    data,
    error,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    rowsPerPage,
    deleteQuestion,
    // paginatedData,
    setSearchTerm,
    filterSearch,
    anchorEl,
    handleMenu,
    sortedQuestionSets,
    handleCloseSort,
    handleSorting
  }
}
