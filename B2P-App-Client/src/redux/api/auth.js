import axios from 'axios'
const url = `${process.env.REACT_APP_API}/user/login/client`

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const loginUser = (name, password) =>
  axios.post(`${url}`, { name, password }, config)
