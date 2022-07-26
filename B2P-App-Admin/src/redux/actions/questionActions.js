import {
  QUESTION_ADD_FAILED,
  QUESTION_ADD_REQUEST,
  QUESTION_ADD_SUCCESS,
  QUESTION_FAILED,
  QUESTION_REQUEST,
  QUESTION_SUCCESS,
  SINGLE_QUESTION_ADD_REQUEST,
  SINGLE_QUESTION_ADD_SUCCESS,
  SINGLE_QUESTION_ADD_FAILED,
  QUESTION_DELETE_REQUEST,
  QUESTION_DELETE_SUCCESS,
  QUESTION_DELETE_FAILED
} from '../constants/questionConstant.js'
import {
  getQuestions,
  getSingleQuestionSet,
  addQuestionApi,
  getSingleQuestionApi,
  editSingleQuestionApi,
  editSingleWorkerQuestionApi,
  deleteSingleQuestionApi
} from '../api/question.js'
import { registerUSer } from '../api/users.js'

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

export const viewSingleQuestionSet = (questionSetId) => async (dispatch, getState) => {
  try {
    console.log('questionSetId', questionSetId)
    const {
      userLogin: { data: userData }
    } = getState()
    dispatch({
      type: SINGLE_QUESTION_ADD_REQUEST
    })

    const { data } = await getSingleQuestionSet(userData, questionSetId)

    dispatch({
      type: SINGLE_QUESTION_ADD_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: SINGLE_QUESTION_ADD_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

/**
 *
 * @param {*} setName : Title of Project
 * @param {*} clientName : Create client and add client id to project
 * @param {*} clientPassword : Create client and add client id to project
 * @param {*} workers : Create Array of workers and add worker id to project
 * @param {*} querry : Create Question answer for Project
 *
 */
export const addQuestion =
  (setName, clientName, clientPassword, querry, workers) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: QUESTION_ADD_REQUEST
      })
      const {
        userLogin: { data: userData }
      } = getState()

      const { data: clientData } = await registerUSer(
        clientName,
        clientPassword,
        'client'
      )

      const workerArray = []

      await Promise.all(
        workers.map(async (worker) => {
          console.log('worker', worker)
          const { data: workerData } = await registerUSer(
            worker.workerName,
            worker.workerPassword,
            'worker'
          )
          workerArray.push(workerData._id)
        })
      )

      const { data } = await addQuestionApi(
        userData,
        setName,
        [clientData._id],
        workerArray,
        querry
      )

      dispatch({
        type: QUESTION_ADD_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: QUESTION_ADD_FAILED,
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

export const editQuestion =
  (id, setName, client, worker, querry) => async (dispatch, getState) => {
    try {
      dispatch({
        type: QUESTION_ADD_REQUEST
      })
      const {
        userLogin: { data: userData }
      } = getState()
      const { data } = await editSingleQuestionApi(
        userData,
        id,
        setName,
        client,
        worker,
        querry
      )
      console.log(data)
      dispatch({
        type: QUESTION_ADD_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: QUESTION_ADD_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export const editSingleWorkerQuestion =
  (questionSet, questionId, question, dataType, mandatory) =>
  async (dispatch, getState) => {
    try {
      console.log('Dhukche')
      dispatch({
        type: QUESTION_ADD_REQUEST
      })
      const {
        userLogin: { data: userData }
      } = getState()
      const { data } = await editSingleWorkerQuestionApi(
        userData,
        questionSet,
        questionId,
        question,
        dataType,
        mandatory
      )
      console.log(data)
      dispatch({
        type: QUESTION_ADD_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: QUESTION_ADD_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export const deleteSingleQuestion =
  (questionSet, questionId) => async (dispatch, getState) => {
    try {
      console.log('Dhukche')
      dispatch({
        type: QUESTION_DELETE_REQUEST
      })
      const {
        userLogin: { data: userData }
      } = getState()
      const { data } = await deleteSingleQuestionApi(userData, questionSet, questionId)
      console.log(data)
      dispatch({
        type: QUESTION_DELETE_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: QUESTION_DELETE_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }
