import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleQuestions } from '../../redux/actions/questionActions.js'
import { useEffect } from 'react'

export const ViewQuestionLogic = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { loading, data, error } = useSelector((state) => state.viewQuestion)

  useEffect(() => {
    dispatch(getSingleQuestions(id))
  }, [dispatch, id])

  return {
    loading,
    error,
    data,
  }
}
