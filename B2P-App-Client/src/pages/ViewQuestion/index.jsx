import { Container, Paper, Typography, LinearProgress } from '@mui/material'
import React from 'react'
import { ViewQuestionLogic } from './ViewQuestion.js'
import Alerts from '../../components/Alerts/index.jsx'
function ViewQuestion() {
  const { loading, error, data } = ViewQuestionLogic()
  console.log(data)
  return (
    <>
      {loading && <LinearProgress style={{ margin: '4px auto' }} color="primary" />}
      {error && (
        <Alerts severity="error" info={'Something went Wrong !, Please Login Again'} />
      )}
      <Container maxWidth="md">
        <Paper style={{ padding: '1rem' }}>
          <Typography align="center" variant="h3">
            {data && data.body[0].setName}
          </Typography>
          {data &&
            data.body[0].querry.map((item, index) => {
              return (
                <div key={index}>
                  <br />
                  <br />
                  <Paper elevation={2} style={{ padding: '1rem 1.5rem'  }}>
                    <Typography>
                      <b>{item.question}</b>
                    </Typography>
                    <hr />
                    {item.dataType === 'text' ? (
                        <>  
                        <ul>                      
                             {data && item.answer.map((ans, index) => {
                                return(
                                    <li key={index}>
                                    <Typography>{ans}</Typography>
                                     </li>
                                )
                              })}
                              </ul>
                        </>
                      
                    ) : (
                        <>                        
                        {data && item.answer.map((ans, index) => {
                           return(
                               <div key={index}>
                               <Typography><img src={ans} alt='images'/></Typography>
                                </div>
                           )
                         })}
                   </>
                    )}
                  </Paper>
                </div>
              )
            })}
        </Paper>
      </Container>
    </>
  )
}

export default ViewQuestion
