import {
  Button,
  Container,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import clsx from 'clsx'
import React, { useState } from 'react'
import CrudQuestions from '../../components/CrudQuestions/index.jsx'
import Modals from '../../components/Modals/index.jsx'

import { useDispatch, useSelector } from 'react-redux'
import { addQuestion } from '../../redux/actions/questionActions.js'
import Alerts from '../../components/Alerts/index.jsx'
import { useStyles } from './addQuestionSet.style'
import swal from 'sweetalert'
import ScrollToTop from '../../ScrollToTop.js'

const Questions = []
const QuestionsForShow = []
const QuestionsToDelete = []
const selectedWorkers = []

function AddQuestionSet() {
  const [checkMandatory, setCheckMandatory] = useState(true)
  const [typeOfAns, setTypeOfAns] = useState('')

  const handleRequiredBtn = (event) => {
    setCheckMandatory(event.target.checked)
  }

  const classes = useStyles()

  // For edit popup
  const [open, setOpen] = useState(false)
  const [newQuestion, setNewQuestion] = useState('')
  const [questionsetName, setQuestionSetName] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientPassword, setClientPassword] = useState('')
  const [workerCount, setWorkerCount] = useState(0)
  const [newWorker, setNewWorker] = useState({ workerName: '', workerPassword: '' })

  const dispatch = useDispatch()

  // addQuestion
  const { data, error, loading } = useSelector((state) => state.addQuestion)

  const handleOpen = () => {
    setNewQuestion('')
    setTypeOfAns('')
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const submit = (questionContent, ans, check) => {
    console.log(questionContent, ans, check)
    if (questionContent === '') {
      swal('Oops!', 'Please enter question', 'error')
    }
    Questions.push({
      question: questionContent,
      dataType: ans,
      mandatory: check
      // answer: ['Answer yet to come']
    })
    QuestionsForShow.push({
      question: {
        question: questionContent,
        dataType: ans,
        mandatory: check
      },
      data: ['Answer yet to come']
    })
    handleClose()
  }

  const handleWorkerDetails = () => {
    if (newWorker.workerName && newWorker.workerPassword) {
      selectedWorkers.push(newWorker)
      setNewWorker({
        workerName: '',
        workerPassword: ''
      })
      setWorkerCount(workerCount + 1)
    } else {
      swal('Enter a valid worker username and password')
    }
  }

  const handleDeleteWorkerDetails = (index) => {
    selectedWorkers.splice(index, 1)
    setWorkerCount(workerCount - 1)
  }

  const ScrollToTop = () => {
    window.scrollTo(0, 0)
  }

  const saveQuestionSet = () => {
    if (
      questionsetName === '' &&
      Questions.length === 0 &&
      selectedWorkers.length === 0
    ) {
      swal('Please enter a valid question set name and atleast one question')
    } else if (questionsetName === '') {
      swal('Oops!', 'Please enter question set name', 'error')
    } else if (clientName === '') {
      swal('Oops!', 'Please enter client name', 'error')
    } else if (clientPassword === '') {
      swal('Oops!', 'Please enter client password', 'error')
    } else if (Questions.length === 0) {
      swal('Oops!', 'Please enter atleast one question', 'error')
    } else if (selectedWorkers.length === 0) {
      swal('Oops!', 'Please enter atleast one worker', 'error')
    } else {
      dispatch(
        addQuestion(
          questionsetName,
          clientName,
          clientPassword,
          Questions,
          selectedWorkers
        )
      )
    }
    // scroll the page to top
    ScrollToTop()
  }

  return (
    <>
      <Container maxWidth="xl" style={{ width: '96%' }}>
        {error && <Alerts severity="error" info={error} />}
        {data && <Alerts severity="success" info="Question Set added Successful !" />}
        {loading && <LinearProgress style={{ margin: '4px auto' }} color="primary" />}
        <br />
        <Button
          variant="outlined"
          className={clsx(classes.buttons, classes.addQuestionBtn)}
          onClick={() => handleOpen()}
        >
          Add a New Question
        </Button>
        <Modals
          contentText="Add a New Question"
          setNewContent={setNewQuestion}
          content={newQuestion}
          open={open}
          setOpen={setOpen}
          submitFunction={submit}
          handleClose={handleClose}
          checkMandatory={checkMandatory}
          handleRequired={handleRequiredBtn}
          typeOfAns={typeOfAns}
          setTypeOfAns={setTypeOfAns}
        />
        <Button
          variant="outlined"
          className={clsx(classes.buttons, classes.saveChangesBtn)}
          onClick={() => saveQuestionSet()}
        >
          Save Changes
        </Button>
        <br />
        <br />
        <br />
        <Paper style={{ padding: '1rem' }}>
          <form>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <Typography variant="h6">Enter Project Name</Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Project Name"
                  variant="standard"
                  value={questionsetName}
                  onChange={(e) => setQuestionSetName(e.target.value)}
                />
              </Grid>

              <Grid item md={4} xs={12}>
                <Typography variant="h6">Enter Client Name</Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Client Name"
                  variant="standard"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <Typography variant="h6">Enter Client Password</Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Client Password"
                  variant="standard"
                  value={clientPassword}
                  onChange={(e) => setClientPassword(e.target.value)}
                />
              </Grid>
            </Grid>
          </form>
        </Paper>

        <br />
        <Paper className={classes.workerPaper}>
          <div>
            <Typography
              variant="h5"
              align="center"
              color="primary"
              id="transition-modal-title"
              style={{ fontWeight: '500' }}
            >
              Add Workers
            </Typography>
            <br />
            <div className={classes.workPaper_form}>
              <TextField
                className={classes.workerPaper_form_textField}
                label="Worker Username"
                variant="standard"
                value={newWorker.workerName}
                onChange={(e) =>
                  setNewWorker((prevState) => ({
                    ...prevState,
                    workerName: e.target.value
                  }))
                }
              />
              <TextField
                className={classes.workerPaper_form_textField}
                label="Worker Password"
                variant="standard"
                value={newWorker.workerPassword}
                onChange={(e) =>
                  setNewWorker((prevState) => ({
                    ...prevState,
                    workerPassword: e.target.value
                  }))
                }
              />
              <br />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => handleWorkerDetails()}
                className={classes.buttons}
                style={{ marginTop: '0.25vw' }}
              >
                Add
              </Button>
            </div>
          </div>

          <TableContainer component={Paper} className={classes.workerPaper_table}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeading}>No. of Workers</TableCell>
                  <TableCell className={classes.tableHeading}>Worker Username</TableCell>
                  <TableCell className={classes.tableHeading}>Worker Password</TableCell>
                  <TableCell align="center" className={classes.tableHeading}>
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedWorkers.map((workerDetails, index) => (
                  <TableRow
                    key={workerDetails.workerName}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Worker {index + 1}
                    </TableCell>
                    <TableCell>{workerDetails.workerName}</TableCell>
                    <TableCell>{workerDetails.workerPassword}</TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="h6"
                        className={classes.headingFont}
                        style={{ textAlign: 'center' }}
                      >
                        <Button
                          onClick={() => {
                            handleDeleteWorkerDetails(index)
                          }}
                        >
                          <DeleteIcon className={classes.deleteIcon} />
                        </Button>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <br />
        <CrudQuestions
          data={QuestionsForShow}
          questionsForPostEdit={Questions}
          QuestionsToDelete={QuestionsToDelete} //doesn't matter in this pg but used here not to give err
        />

        <Typography align="center">
          <Button
            variant="outlined"
            size="large"
            className={clsx(classes.buttons, classes.addQuestionBtn)}
            style={{ margin: '3rem 0 4.5rem' }}
            onClick={() => handleOpen()}
          >
            Add a New Question
          </Button>
        </Typography>
      </Container>

      <Button
        variant="outlined"
        className={clsx(classes.buttons, classes.saveChangesBtn)}
        onClick={() => saveQuestionSet()}
      >
        Save Changes
      </Button>
    </>
  )
}

export default AddQuestionSet
