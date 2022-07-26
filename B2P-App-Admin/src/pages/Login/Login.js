import { useNavigate } from 'react-router'

import * as yup from 'yup'
import { useFormik } from 'formik'

import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../redux/actions/authAction.js'

const LoginLogic = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, error, loading } = useSelector((state) => state.userLogin)

  // Form validation
  const validationSchema = yup.object({
    username: yup.string().required('Required'),
    password: yup.string().required('Password is Required')
  })
  // Formik data validation
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      console.log('Test')
      if (dispatch(userLogin(values.username, values.password))) {
        if (data && !loading) {
          navigate('/')
        }
      }
    }
  })

  return {
    data,
    error,
    loading,
    formik
  }
}
export default LoginLogic
