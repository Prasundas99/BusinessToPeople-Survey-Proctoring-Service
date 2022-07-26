import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from '../constants/authConstant.js'
import { loginUser } from '../api/auth.js'

export const userLogin = (name, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })
    const { data } = await loginUser(name, password)
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })
    window.localStorage.setItem('userData', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const userLogout = () => (dispatch) => {
  window.localStorage.removeItem('userData')
  dispatch({
    type: USER_LOGOUT
  })
}
