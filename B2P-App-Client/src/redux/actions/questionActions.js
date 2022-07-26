import {
  QUESTION_FAILED,
  QUESTION_REQUEST,
  QUESTION_SUCCESS
} from '../constants/questionConstant.js'
import { getQuestions, getSingleQuestionApi } from '../api/question.js'

export const getAllQuestions = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { data: userData }
    } = getState()
    dispatch({
      type: QUESTION_REQUEST
    })

    const { data } = await getQuestions(userData)

    dispatch({
      type: QUESTION_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: QUESTION_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const getSingleQuestions = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { data: userData }
    } = getState()
    dispatch({
      type: QUESTION_REQUEST
    })

    const { data } = await getSingleQuestionApi(userData, id)

    dispatch({
      type: QUESTION_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: QUESTION_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
