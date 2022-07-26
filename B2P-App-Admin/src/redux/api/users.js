import axios from 'axios'
const url = `${process.env.REACT_APP_API}/user`

export const getUsers = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  }
  const data = await axios.get(`${url}`, config)
  return data
}

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const registerUSer = async (name, password, userType) => {
  const body = {
    name,
    password
  }
  const data = await axios.post(`${url}/add/${userType}`, body, config)
  return data
}

export const searchUsers = async (userData, name, userType) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token}`
    }
  }
  const data = await axios.post(`${url}/search/${userType}`, { name }, config)
  return data
}
