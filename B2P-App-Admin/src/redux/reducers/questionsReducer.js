import {
  QUESTION_REQUEST,
  QUESTION_SUCCESS,
  QUESTION_FAILED,
  QUESTION_ADD_FAILED,
  QUESTION_ADD_REQUEST,
  QUESTION_ADD_SUCCESS,
  SINGLE_QUESTION_ADD_REQUEST,
  SINGLE_QUESTION_ADD_SUCCESS,
  SINGLE_QUESTION_ADD_FAILED,
  QUESTION_DELETE_REQUEST,
  QUESTION_DELETE_SUCCESS,
  QUESTION_DELETE_FAILED
} from '../constants/questionConstant.js'

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

export const viewSingleQuestionSetReducer = (state = {}, action) => {
  switch (action.type) {
    case SINGLE_QUESTION_ADD_REQUEST:
      return {
        loading: true,
        data: null,
        error: null
      }
    case SINGLE_QUESTION_ADD_SUCCESS:
      return {
        loading: false,
        data: action.payload
      }
    case SINGLE_QUESTION_ADD_FAILED:
      return {
        loading: false,
        data: null,
        error: action.payload
      }
    default:
      return state
  }
}

export const deleteSingleQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_DELETE_REQUEST:
      return {
        loading: true
      }
    case QUESTION_DELETE_SUCCESS:
      return {
        loading: false,
        data: action.payload
      }
    case QUESTION_DELETE_FAILED:
      return {
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}
