import {
    SINGLE_WORKER_ANSWER_REQUEST,
    SINGLE_WORKER_ANSWER_SUCCESS,
    SINGLE_WORKER_ANSWER_FAILED 
  } from '../constants/answerConstant.js'
  import {
    getSingleWorkerAns
  } from '../api/answer.js'


export const getSingleWorkerAnswers = (questionSetId, workerId) => async (dispatch, getState) => {
    try {
      console.log('questionSetId', questionSetId)
      console.log('workerId', workerId)
      const {
        userLogin: { data: userData }
      } = getState()
      dispatch({
        type: SINGLE_WORKER_ANSWER_REQUEST
      })
  
      const { data } = await getSingleWorkerAns(userData, questionSetId, workerId)
  
      dispatch({
        type: SINGLE_WORKER_ANSWER_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: SINGLE_WORKER_ANSWER_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }