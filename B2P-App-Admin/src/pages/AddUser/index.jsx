import { useState } from 'react'
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  LinearProgress
} from '@mui/material'
import { useStyles } from './addUser.style.js'
import swal from 'sweetalert'
import Alerts from '../../components/Alerts'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../redux/actions/userActions.js'

function AddUser () {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { data, error, loading } = useSelector((state) => state.addUser)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [type, setType] = useState('')

  const handleSubmit = (e) => {
    if (!(password === confirm)) return swal('Oops!', 'Passwords Should be same', 'error')
    dispatch(addUser(name, password, type))
  }

  return (
    <Container maxWidth='md'>
      <Typography variant='h3' align='center'>
        Add A User
      </Typography>
      <Container maxWidth='md'>

        <Paper className={classes.paper} elevation={6}>
          {error && <Alerts severity='error' info={error} />}
          {data && <Alerts severity='success' info='User added Successful !' />}
          {loading && <LinearProgress style={{ margin: '4px auto' }} color='primary' />}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(e)
            }}
          >
            <TextField
              variant='standard'
              fullWidth
              placeholder='Username'
              className={classes.field}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              variant='standard'
              type='password'
              fullWidth
              placeholder='Password'
              className={classes.field}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              variant='standard'
              type='password'
              fullWidth
              placeholder='Confirm Password'
              className={classes.field}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
            <Grid container className={classes.field}>
              <Grid item sm={4}>
                {' '}
                <Typography variant='h6'>Type of User</Typography>{' '}
              </Grid>
              <Grid item sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='user-type-label'>Type Of User</InputLabel>
                  <Select
                    variant='outlined'
                    labelId='user Type'
                    id='user-type'
                    label='Type Of User'
                    required
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='client'>Client</MenuItem>
                    <MenuItem value='worker'>Worker</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Typography align='center'>
              <Button
                type='submit'
                variant='outlined'
                size='large'
                className={classes.button}
              >
                Submit
              </Button>
            </Typography>
          </form>
        </Paper>
      </Container>
    </Container>
  )
}

export default AddUser
