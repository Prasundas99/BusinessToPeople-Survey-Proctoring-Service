import axios from 'axios'
const url = `${process.env.REACT_APP_API}/question-set`


// View SingleWorker Answer
export const getSingleWorkerAns = async (userData, questionSetId, workerId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`
      }
    }
    const data = await axios.get(`${url}/answer/${questionSetId}/${workerId}`, config)
    console.log("Single Worker Ans", data)
    return data
  }