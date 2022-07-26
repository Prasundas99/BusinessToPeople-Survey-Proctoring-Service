import swal from 'sweetalert'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { viewSingleQuestionSet } from '../../redux/actions/questionActions.js'
import { useEffect, useState } from 'react'

let workerAnswers = []

export const SingleQuestionSetLogic = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')

  const { id: questionSetId } = useParams()

  const { loading, data, error } = useSelector((state) => state.viewSingleQuestionSet)
  const dispatch = useDispatch()

  // Get unique elements from data.answers which is an array taking primary key as worker
  const uniqueWorkerId = [
    ...new Set(data && data.answers && data.answers.map((ans) => {return ans.worker}))
  ]

  uniqueWorkerId.map((singleWorkerId) => {
    workerAnswers.push(data && data.answers.filter((ans) => ans.worker === singleWorkerId)[0]);
  })

/*
  // function to get the longest length of the array among a collection of arrays
  const getLongestLength = (arr) => {
    let longest = 0;
   arr.map((singleArr) => { 
      if(longest < singleArr.answer.length) 
        longest = singleArr.answer.length;
    })
    return longest;
  }

  let arr = data && data.body && data.body.querry
  let longestLength = getLongestLength(arr)
*/

  useEffect(() => {
    dispatch(viewSingleQuestionSet(questionSetId))
    workerAnswers = []
  }, [dispatch, questionSetId])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return {
    loading,
    data,
    error,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    rowsPerPage,
    questionSetId,
    workerAnswers,
   // longestLength
    // paginatedData,
  }
}
