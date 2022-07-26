import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { CSVLink } from 'react-csv'
import {
  Button,
  Grid,
  Container,
  MenuItem,
  LinearProgress,
  Paper,
  Typography,
  TextField
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CrudQuestions from '../../components/CrudQuestions/index.jsx'
import { SingleWorkerAnswerLogic } from './SingleWorkerAnswer.js'
import {
  editSingleWorkerQuestion,
  deleteSingleQuestion
} from '../../redux/actions/questionActions.js'

import Alerts from '../../components/Alerts/index.jsx'
import { useStyles, StyledMenu } from './singleWorkerAnswer.style.js'
import Modals from '../../components/Modals/index.jsx'

import { useDispatch } from 'react-redux'
// import { editQuestion } from '../../redux/actions/questionActions.js'

import { Loader } from '@googlemaps/js-api-loader'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const Questions = []
const QuestionsToDelete = []

function SingleWorkerAnswers() {
  const {
    loading,
    data,
    error,
    anchorElClient,
    openClient,
    handleClickClient,
    anchorElWorker,
    openWorker,
    handleClickWorker,
    handleClose,
    csvData
  } = SingleWorkerAnswerLogic()

  const center = {
    lat: 0,
    lng: 0
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const containerStyle = {
    width: '500px',
    height: '350px'
  }

  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // For edit popup
  const [open, setOpen] = useState(false)
  const [newQuestion, setNewQuestion] = useState('')
  const [questionsetName, setQuestionSetName] = useState('')
  const [checkMandatory, setCheckMandatory] = useState(true)
  const [typeOfAns, setTypeOfAns] = useState('')

  const handleRequiredBtn = (event) => {
    setCheckMandatory(event.target.checked)
  }

  useEffect(() => {
    data && setQuestionSetName(data && data.body[0].questionSet.setName)
    data &&
      data.body.map((eachAns) => {
        return Questions.includes(eachAns.question)
          ? null
          : Questions.push(eachAns.question)
      })
  }, [data])

  const addQuestionOpen = () => {
    setNewQuestion('')
    setTypeOfAns('')
    setOpen(true)
  }

  console.log(loading, data, error)
  console.log('Questions', Questions)

  const addQuestionClose = () => {
    setOpen(false)
  }

  const submit = (questionContent, ans, check) => {
    Questions.push({
      question: questionContent,
      dataType: ans,
      mandatory: check,
      answer: ['Answer yet to come']
    })
    addQuestionClose()
  }

  const saveQuestion = () => {
    Questions.map((sendEachQuestion) => {
      const { questionSet, _id, question, dataType, mandatory } = sendEachQuestion
      // console.log('EDIT', questionSet, _id, question, dataType, mandatory)
      dispatch(editSingleWorkerQuestion(questionSet, _id, question, dataType, mandatory))
    })
    QuestionsToDelete &&
      QuestionsToDelete.map((eachQuestion) => {
        const { questionSet, _id } = eachQuestion.question
        dispatch(deleteSingleQuestion(questionSet, _id))
      })
    navigate(0)
  }

  return (
    <Container maxWidth="xl" style={{ width: '96%' }}>
      {loading && <LinearProgress style={{ margin: '4px auto' }} color="primary" />}
      {error && (
        <Alerts severity="error" info="Something went Wrong !, Please Login Again" />
      )}
      <Grid container>
        <Grid item md={4}>
          <Button variant="contained" size="small" className={classes.buttons}>
            <CSVLink
              filename="B2P-QuestionSet.csv"
              className={classes.exportBtn_csvTag}
              data={csvData}
            >
              Export Set
            </CSVLink>
          </Button>
        </Grid>
        <Grid item md={4}>
          <Typography align="center">
            <TextField
              placeholder="Question Set Name"
              label="Question Set Name"
              variant="standard"
              value={questionsetName}
              disabled
              helperText="Not editable."
            />
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Button variant="text" />
          <Button
            variant="contained"
            color="primary"
            className={clsx(classes.buttons, classes.saveChangesBtn)}
            onClick={() => saveQuestion()}
          >
            Save Changes
          </Button>
          <Button variant="text" />
        </Grid>
      </Grid>

      {/* Activity Part */}
      <Paper style={{ margin: '2rem 0', padding: '1.3vw 0' }}>
        <Grid container>
          <Grid item md={6} style={{ paddingLeft: '3vw' }}>
            <Typography variant="h6" align="left" className={classes.activityGrid_infos}>
              Activity Date :{' '}
              <span style={{ color: '#FF6D3A' }}>
                {data &&
                  data.body &&
                  data.body[0] &&
                  new Date(data.body[0].createdAt).toLocaleDateString()}
              </span>
            </Typography>
            <Typography variant="h6" align="left" className={classes.activityGrid_infos}>
              Activity Time :{' '}
              <span style={{ color: '#FF6D3A' }}>
                {data &&
                  data.body &&
                  data.body[0] &&
                  new Date(data.body[0].createdAt).toLocaleTimeString()}
              </span>
            </Typography>
            <Typography variant="h6" align="left" className={classes.activityGrid_infos}>
              Geolocation :
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={{
                    lat: data && data.body[0].coordinates[1],
                    lng: data && data.body[0].coordinates[0]
                  }}
                  zoom={15}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                >
                  {/* Child components, such as markers, info windows, etc. */}
                  <>
                    <Marker
                      position={{
                        lat: data && data.body[0].coordinates[1],
                        lng: data && data.body[0].coordinates[0]
                      }}
                    />
                  </>
                </GoogleMap>
              ) : (
                <></>
              )}
            </Typography>
          </Grid>
          <Grid item md={6} style={{ paddingLeft: '2vw' }}>
            <Typography variant="h6" align="left" className={classes.activityGrid_infos}>
              Worker Id :{' '}
              <span style={{ color: '#FF6D3A' }}>
                {data && data.body && data.body[0] && data.body[0].worker._id}
              </span>
            </Typography>
            <Typography variant="h6" align="left" className={classes.activityGrid_infos}>
              Worker Name :{' '}
              <span style={{ color: '#FF6D3A' }}>
                {data && data.body && data.body[0] && data.body[0].worker.workerName}
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <CrudQuestions
        data={data && data.body && data.body}
        questionsForPostEdit={Questions}
        QuestionsToDelete={QuestionsToDelete}
      />
    </Container>
  )
}

export default SingleWorkerAnswers
