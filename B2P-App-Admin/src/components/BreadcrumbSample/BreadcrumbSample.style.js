import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    margin: '0.5rem 0 0 1rem',
    [theme.breakpoints.down('sm')]: {
      margin: '1rem 0 0 2.4rem'
    }
  },
  heading: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  },
  subHeading: {
    fontWeight: '600',
    color: '#000'
  }
}))
