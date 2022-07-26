import { useNavigate } from 'react-router'

import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from  '../../redux/actions/userAction.js'

export const TopNavLogic = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data } = useSelector((state) => state.userLogin)
  const { clientName: userName } = data.userDef

  // redirect to login  page if logged out
  const handelLogout = () => {
    dispatch(userLogout())
    navigate('/login')
  }

  return {
    handelLogout,
    userName
  }
}
