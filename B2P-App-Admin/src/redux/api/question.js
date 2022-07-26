import axios from 'axios'
const url = `${process.env.REACT_APP_API}/question-set`

export const getQuestions = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  }
  const data = await axios.get(`${url}`, config)
  return data
}

// View SingleQuestionSet
export const getSingleQuestionSet = async (userData, questionSetId) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  }
  const data = await axios.get(`${url}/${questionSetId}`, config)
  console.log(data)
  return data
}

export const addQuestionApi = async (userData, setName, client, worker, querry) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  }
  const body = {
    setName,
    client,
    worker,
    querry
  }
  const data = await axios.post(`${url}`, body, config)
  return data
}

export const getSingleQuestionApi = async (userData, id) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  }
  const data = await axios.get(`${url}/${id}`, config)
  return data
}

export const deleteSingleQuestionApi = async (userData, questionSetId, questionId) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  }

  const data = await axios.delete(
    `${url}/${questionSetId}/question/${questionId}`,
    config
  )
  return data
}

export const editSingleQuestionApi = async (
  userData,
  id,
  setName,
  client,
  worker,
  querry
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  }
  const body = {
    setName,
    client,
    worker,
    querry
  }
  const data = await axios.put(`${url}/${id}`, body, config)
  return data
}

export const editSingleWorkerQuestionApi = async (
  userData,
  questionSet,
  questionId,
  question,
  dataType,
  mandatory
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  }
  const body = {
    question,
    dataType,
    mandatory
  }
  const data = await axios.put(
    `${url}/${questionSet}/question/${questionId}`,
    body,
    config
  )
  return data
}
