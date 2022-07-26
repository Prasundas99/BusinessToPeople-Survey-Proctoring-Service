import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILED,
  USER_ADD_FAILED,
  USER_ADD_REQUEST,
  USER_ADD_SUCCESS
} from '../constants/userConstants.js'

export const viewUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        loading: true,
        data: null,
        error: null
      }
    case USER_SUCCESS:
      return {
        loading: false,
        data: action.payload
      }
    case USER_FAILED:
      return {
        loading: false,
        data: null,
        error: action.payload
      }
    default:
      return state
  }
}

export const addUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADD_REQUEST:
      return {
        loading: true,
        data: null,
        error: null
      }
    case USER_ADD_SUCCESS:
      return {
        loading: false,
        data: action.payload
      }
    case USER_ADD_FAILED:
      return {
        loading: false,
        data: null,
        error: action.payload
      }
    default:
      return state
  }
}

export const searchAllUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return {
        loading: true,
        data: null,
        error: null
      }
    case USER_SUCCESS:
      return {
        loading: false,
        data: action.payload
      }
    case USER_FAILED:
      return {
        loading: false,
        data: null,
        error: action.payload
      }
    default:
      return state
  }
}
