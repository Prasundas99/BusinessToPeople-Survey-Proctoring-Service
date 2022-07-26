import { Navigate, useLocation } from 'react-router-dom'
// Redux stuff
import { useSelector } from 'react-redux'
// Function which wrap its child components with normal navbar
export function RequireAuth ({ children }) {
  const { data } = useSelector((state) => state.userLogin)
  const location = useLocation()
  if (!data) {
    return <Navigate to='/login' state={{ from: location }} />
  }
  return children
}

export function ReverseAuth ({ children }) {
  const { data } = useSelector((state) => state.userLogin)
  const location = useLocation()
  if (data) {
    return <Navigate to='/' state={{ from: location }} />
  }
  return children
}
