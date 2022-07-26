import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'
import Switch from '@mui/material/Switch'

export const useStyles = makeStyles((theme) => ({
  questionField: {
    width: '70%',
    borderColor: theme.palette.primary.main
  },
  editAndDelBtn: {
    position: 'relative',
    textDecoration: 'none',
    borderRadius: '6px',
    padding: '0.25rem 1rem',
    textTransform: 'none',
    fontSize: '1rem',
    border: '2px solid grey',
    marginRight: '1.5rem',
    marginBottom: '0.17rem'
  },
  editBtn: {
    '&:hover': {
      color: '#0cb800',
      border: '2px solid #0cb800'
    }
  },
  deleteBtn: {
    '&:hover': {
      color: '#F8485E',
      border: '2px solid #F8485E'
    }
  },
  paper_ansType: {
    fontWeight: '500',
    fontSize: '1.1rem',
    display: 'block',
    marginBottom: '0.6rem',
    color: theme.palette.primary.main
  }
}))

export const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12
    }
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2
  }
}))
