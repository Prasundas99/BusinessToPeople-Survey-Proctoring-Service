import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleQuestions } from '../../redux/actions/questionActions.js'

export const ViewQuestionSetLogic = (Questions) => {
  console.log(Questions)
  const { id } = useParams()
  const dispatch = useDispatch()

  const { loading, data, error } = useSelector((state) => state.viewQuestion)

  console.log("------------------------------------", data);

  useEffect(() => {
    dispatch(getSingleQuestions(id))
  }, [dispatch, id])

  // Clients & Workers Assigned
  const [anchorElClient, setAnchorElClient] = useState(null)
  const [anchorElWorker, setAnchorElWorker] = useState(null)
  const openClient = Boolean(anchorElClient)
  const openWorker = Boolean(anchorElWorker)

  const handleClickClient = (event) => {
    setAnchorElClient(event.currentTarget)
  }
  const handleClickWorker = (event) => {
    setAnchorElWorker(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorElClient(null)
    setAnchorElWorker(null)
  }

  useEffect(() => {
    addData()
  }, [data])

  const addData = () => {
    data && data.body[0].querry.map((item) => Questions.push(item))
  }

  console.log('data', data)

  // CSV Export
  const csvData = [
    [
      'Id',
      'Question Set Name',
      'Created At',
      'Questions',
      'Answers',
      'Question Type',
      'Is Mandatory'
    ]
  ]

  data &&
    data.body &&
    data.body.map((setReport) =>
      Questions.map((question) =>
        csvData.push([
          setReport._id,
          setReport.setName,
          setReport.createdAt,
          question.question,
          question.answer,
          question.dataType,
          question.mandatory
        ])
      )
    )

  return {
    loading,
    data,
    error,
    anchorElClient,
    setAnchorElClient,
    openClient,
    handleClickClient,
    anchorElWorker,
    setAnchorElWorker,
    openWorker,
    handleClickWorker,
    handleClose,
    id,
    csvData
  }
}
