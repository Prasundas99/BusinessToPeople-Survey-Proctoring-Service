import axios from 'axios'
const API = process.env.REACT_APP_API

// Delete User
export const deleteUserHelper = async (id, token) => {
  const url = `${API}/question-set/${id}`

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
