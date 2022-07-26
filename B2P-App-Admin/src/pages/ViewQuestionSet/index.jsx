import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
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
import { ViewQuestionSetLogic } from './viewQuestionSet.js'

import Alerts from '../../components/Alerts/index.jsx'
import { useStyles, StyledMenu } from './viewQuestionSet.style'
import Modals from '../../components/Modals/index.jsx'

import { useDispatch } from 'react-redux'
import { editQuestion } from '../../redux/actions/questionActions.js'

const Questions = []

function ViewQuestionSet () {
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
    id,
    csvData
  } = ViewQuestionSetLogic(Questions)

  const classes = useStyles()
  const dispatch = useDispatch()

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
    data && setQuestionSetName(data.body[0].setName)
  }, [data])

  const addQuestionOpen = () => {
    setNewQuestion('')
    setTypeOfAns('')
    setOpen(true)
  }

  const addQuestionClose = () => {
    console.log('close')
    setOpen(false)
  }

  const submit = (questionContent, ans, check) => {
    Questions.push({ question: questionContent, dataType: ans, mandatory: check, answer: ['Answer yet to come'] })
    addQuestionClose()
  }

  const saveQuestion = () => {
    console.log(id, questionsetName, (data && data.body[0].client), (data && data.body[0].worker), Questions)
    dispatch(editQuestion(id, questionsetName, (data && data.body[0].client), (data && data.body[0].worker), Questions))
  }

  return (
    <Container maxWidth='xl' style={{ width: '96%' }}>
      {loading && <LinearProgress style={{ margin: '4px auto' }} color='primary' />}
      {error && (
        <Alerts severity='error' info='Something went Wrong !, Please Login Again' />
      )}
      <Grid container>
        <Grid item md={4}>
          <Button variant='contained' size='small' className={classes.buttons}>
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
          <Typography align='center'>
            <TextField
              placeholder='Question Set Name'
              label='Question Set Name'
              variant='standard'
              value={questionsetName}
              disabled
              helperText='Not editable.'
            />
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Button variant='text' />
          <Button variant='contained' color='primary' className={clsx(classes.buttons, classes.saveChangesBtn)} onClick={() => saveQuestion()}>
            Save Changes
          </Button>
          <Button variant='text' />
        </Grid>
      </Grid>

      {/* Add & Assigned Users Part */}
      <Paper style={{ margin: '2rem 0', padding: '2.3rem 0' }}>
        <Grid container>
          <Grid item md={6}>
            <Button variant='outlined' className={clsx(classes.buttons, classes.addNewQuestionBtn)} onClick={() => addQuestionOpen()}>
              Add a New Question
            </Button>
            <Modals
              contentText='Add a New Question'
              setNewContent={setNewQuestion}
              content={newQuestion}
              open={open}
              setOpen={addQuestionOpen}
              submitFunction={submit}
              handleClose={addQuestionClose}
              checkMandatory={checkMandatory}
              handleRequired={handleRequiredBtn}
              typeOfAns={typeOfAns}
              setTypeOfAns={setTypeOfAns}
            />
          </Grid>
          <Grid item md={6}>
            <Button
              id='demo-customized-button'
              aria-controls={openWorker ? 'demo-customized-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={openWorker ? 'true' : undefined}
              variant='contained'
              className={clsx(classes.buttons, classes.assignedButtons)}
              onClick={handleClickWorker}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Workers Assigned
            </Button>
            <StyledMenu
              id='demo-customized-menu'
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button'
              }}
              anchorEl={anchorElWorker}
              open={openWorker}
              onClose={handleClose}
            >
              {data &&
                data.body[0].worker.map((worker) => {
                  return <MenuItem disableRipple>{worker.workerName}</MenuItem>
                })}
            </StyledMenu>

            <Button
              id='demo-customized-button'
              aria-controls={openClient ? 'demo-customized-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={openClient ? 'true' : undefined}
              variant='contained'
              className={clsx(classes.buttons, classes.assignedButtons)}
              onClick={handleClickClient}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Clients Assigned
            </Button>
            <StyledMenu
              id='demo-customized-menu'
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button'
              }}
              anchorEl={anchorElClient}
              open={openClient}
              onClose={handleClose}
            >
              {data &&
                data.body[0].client.map((client) => {
                  return <MenuItem disableRipple>{client.clientName}</MenuItem>
                })}
            </StyledMenu>
          </Grid>
        </Grid>
      </Paper>
      <CrudQuestions data={Questions} />

    </Container>
  )
}

export default ViewQuestionSet
