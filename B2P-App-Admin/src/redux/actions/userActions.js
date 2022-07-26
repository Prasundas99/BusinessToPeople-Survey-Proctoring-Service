import {
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAILED,
  USER_ADD_FAILED,
  USER_ADD_REQUEST,
  USER_ADD_SUCCESS
} from '../constants/userConstants.js'
import { getUsers, registerUSer, searchUsers } from '../api/users.js'

export const getAllUsers = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { data: userData }
    } = getState()
    dispatch({
      type: USER_REQUEST
    })

    const { data } = await getUsers(userData)

    dispatch({
      type: USER_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const addUser = (name, password, userType) => async (dispatch) => {
  try {
    dispatch({
      type: USER_ADD_REQUEST
    })

    const { data } = await registerUSer(name, password, userType)

    dispatch({
      type: USER_ADD_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_ADD_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const searchAllUsers = (searchVal, userType) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { data: userData }
    } = getState()
    dispatch({
      type: USER_REQUEST
    })
    console.log(userType)

    const { data } = await searchUsers(userData, searchVal, userType)
    console.log(data)
    dispatch({
      type: USER_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: USER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
