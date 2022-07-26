import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import Modals from '../Modals/index'

import { useStyles, Android12Switch } from './CrudQuestions.style'

function CrudQuestions({ data, questionsForPostEdit, QuestionsToDelete }) {
  const classes = useStyles()

  // For edit popup
  const [open, setOpen] = useState(false)
  const [counter, setCounter] = useState(1)
  const [getIndex, setGetIndex] = useState()
  const [editQuestion, setEditQuestion] = useState('')
  const [checkMandatory, setCheckMandatory] = useState()
  const [typeOfAns, setTypeOfAns] = useState('')

  const handleOpen = (indexVal, question) => {
    setGetIndex(indexVal)
    setOpen(true)
    setEditQuestion(question.question)
    setCheckMandatory(question.mandatory)
    setTypeOfAns(question.dataType)
  }

  const handleRequiredBtn = (event) => {
    setCheckMandatory(event.target.checked)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleEdit = (questionContent, mandatory, type) => {
    setEditQuestion(questionContent)
    setCheckMandatory(mandatory)
    setTypeOfAns(type)
    handleClose()

    // QuestionsForShow
    data[getIndex].question.question = editQuestion
    data[getIndex].question.mandatory = checkMandatory
    data[getIndex].question.dataType = typeOfAns
    //Questions
    console.log(editQuestion)
    console.log(getIndex)
    console.log(questionsForPostEdit)
    questionsForPostEdit[getIndex].question = editQuestion
    questionsForPostEdit[getIndex].mandatory = checkMandatory
    questionsForPostEdit[getIndex].dataType = typeOfAns
    console.log(questionsForPostEdit)
  }

  useEffect(() => {
    console.log('render')
  }, [counter, data])

  const handleDelete = (elementIndex) => {
    console.log(elementIndex, 'element')
    QuestionsToDelete.push(data[elementIndex])
    console.log(data[elementIndex])
    if (elementIndex > -1) {
      data.splice(elementIndex, 1)
    }
    console.log(data, 'Delete')
    setCounter(counter + 1)
  }

  return (
    <div style={{ margin: '2rem auto', height: '110%' }}>
      <Container>
        {data &&
          data.map((item, index) => {
            return (
              <Paper
                elevation={1}
                style={{
                  boxShadow: '0px 4px 11px rgba(38, 38, 38, 0.2)',
                  padding: '2rem',
                  margin: '1rem auto'
                }}
                key={index}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  className={clsx(classes.editAndDelBtn, classes.editBtn)}
                  onClick={() => handleOpen(index, item.question)}
                >
                  Edit Question
                </Button>{' '}
                <Modals
                  contentText="Edit Question"
                  setNewContent={setEditQuestion}
                  content={editQuestion}
                  open={open}
                  setOpen={setOpen}
                  submitFunction={handleEdit}
                  handleClose={handleClose}
                  checkMandatory={checkMandatory}
                  handleRequired={handleRequiredBtn}
                  typeOfAns={typeOfAns}
                  setTypeOfAns={setTypeOfAns}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  className={clsx(classes.editAndDelBtn, classes.deleteBtn)}
                  onClick={() => handleDelete(index)}
                >
                  Delete Question
                </Button>
                <FormGroup
                  style={{ display: 'inline', float: 'right', marginRight: '2rem' }}
                >
                  <FormControlLabel
                    label="Mandatory"
                    labelPlacement="start"
                    control={<Android12Switch checked={item.question.mandatory} />}
                  />
                </FormGroup>
                <br />
                <br />
                <TextField
                  focused
                  placeholder="Question"
                  label="Question"
                  fullWidth
                  value={item.question.question}
                  className={classes.questionField}
                />
                <br />
                <br />
                <Typography variant="body" className={classes.paper_ansType}>
                  Answer Type -{' '}
                  {item.question.dataType &&
                    item.question.dataType.charAt(0).toUpperCase() +
                      item.question.dataType.slice(1)}
                </Typography>
                <Paper elevation={3} style={{ padding: '1rem' }}>
                  {item.question.dataType === 'text' ? (
                    <>
                      <ul>
                        {data &&
                          item &&
                          item.data.map((ans, index) => {
                            return (
                              <li key={index}>
                                <Typography>{ans}</Typography>
                              </li>
                            )
                          })}
                      </ul>
                    </>
                  ) : (
                    <>
                      {data &&
                        item &&
                        item.data.map((ans, index) => {
                          return (
                            <div key={index}>
                              <Typography>
                                <img src={ans} alt={ans} />
                              </Typography>
                            </div>
                          )
                        })}
                    </>
                  )}
                </Paper>
              </Paper>
            )
          })}
      </Container>
    </div>
  )
}

export default CrudQuestions
