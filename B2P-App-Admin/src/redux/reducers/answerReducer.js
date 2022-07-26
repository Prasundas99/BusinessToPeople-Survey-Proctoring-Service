import {
    SINGLE_WORKER_ANSWER_REQUEST,
    SINGLE_WORKER_ANSWER_SUCCESS,
    SINGLE_WORKER_ANSWER_FAILED
} from "../constants/answerConstant.js"

export const getSingleAnswerReducer = (state = {}, action) => {
    switch (action.type) {
      case SINGLE_WORKER_ANSWER_REQUEST:
        return {
          loading: true,
          data: null,
          error: null
        }
      case SINGLE_WORKER_ANSWER_SUCCESS:
        return {
          loading: false,
          data: action.payload
        }
      case SINGLE_WORKER_ANSWER_FAILED:
        return {
          loading: false,
          data: null,
          error: action.payload
        }
      default:
        return state
    }
  }