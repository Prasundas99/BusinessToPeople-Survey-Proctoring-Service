import { QUESTION_REQUEST, QUESTION_SUCCESS, QUESTION_FAILED, QUESTION_ADD_FAILED, QUESTION_ADD_REQUEST, QUESTION_ADD_SUCCESS } from '../constants/questionConstant.js'

export const viewQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_REQUEST:
      return {
        loading: true,
        data: null,
        error: null
      }
    case QUESTION_SUCCESS:
      return {
        loading: false,
        data: action.payload
      }
    case QUESTION_FAILED:
      return {
        loading: false,
        data: null,
        error: action.payload
      }
    default:
      return state
  }
}



export const addQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_ADD_REQUEST:
      return {
        loading: true,
        data: null,
        error: null
      }
    case QUESTION_ADD_SUCCESS:
      return {
        loading: false,
        data: action.payload
      }
    case QUESTION_ADD_FAILED:
      return {
        loading: false,
        data: null,
        error: action.payload
      }
    default:
      return state
  }
}
