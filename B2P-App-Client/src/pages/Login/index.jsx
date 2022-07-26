import {
  Container,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Avatar,
  LinearProgress,
  Alert
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import LoginLogic from './Login.js'
import { useStyles } from './Login.style.js'

export default function Login () {
  const { error, loading, formik } = LoginLogic()
  const classes = useStyles()
  return (
    <>
      {loading && <LinearProgress style={{ margin: '4px auto' }} color='secondary' />}

      <Container component='main' maxWidth='xs'>
        <Box className={classes.box}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login To Continue
          </Typography>
          {error && (
            <Alert
              style={{ marginTop: '8px', width: '100%' }}
              variant='outlined'
              severity='error'
            >
              {error}
            </Alert>
          )}
          <Box sx={{ mt: 1 }}>
            <form
              className={classes.form}
              noValidate
              onSubmit={(e) => {
                e.preventDefault()
                formik.handleSubmit()
              }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                variant='filled'
                id='username'
                label='Username'
                name='username'
                autoFocus
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                variant='filled'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                className={classes.submit}
              >
                LogIn
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  )
}
