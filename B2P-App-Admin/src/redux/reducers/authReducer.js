import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from '../constants/authConstant.js'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        data: null,
        error: null
      }
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        data: action.payload,
        error: null
      }
    case USER_LOGIN_FAILED:
      return {
        isAuthenticated: false,
        loading: false,
        data: null,
        error: action.payload
      }
    case USER_LOGOUT:
      return {
        isAuthenticated: false
      }
    default:
      return state
  }
}
