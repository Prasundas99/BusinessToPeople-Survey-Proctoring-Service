import axios from 'axios'
const API = process.env.REACT_APP_API

// edit user password
export const editUserPasswordHelper = async (id, token, newPassword) => {
  const body = {
    password: newPassword
  }
  const url = `${API}/user/${id}`

  await axios
    .post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {

    })
}

// Delete User
export const deleteUserHelper = async (id, token) => {
  const url = `${API}/user/${id}`

  await axios
    .delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      console.log('Delete Working')
    })
}
