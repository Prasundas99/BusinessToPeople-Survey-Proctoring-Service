import { makeStyles } from '@mui/styles'
export const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: '20vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.secondary.main
  }
}))
