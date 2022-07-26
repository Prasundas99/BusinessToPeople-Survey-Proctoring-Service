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
