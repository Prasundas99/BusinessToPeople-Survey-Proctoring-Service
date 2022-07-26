import { makeStyles } from '@mui/styles'
import { styled, alpha } from '@mui/material/styles'
import Menu from '@mui/material/Menu'

export const useStyles = makeStyles((theme) => ({
  buttons: {
    position: 'relative',
    textDecoration: 'none',
    borderRadius: '6px',
    height: '2.7rem',
    padding: '0.39rem 1.15rem',
    textTransform: 'none',
    fontSize: '1.15rem',
    backgroundColor: '#FFF6F2',
    color: theme.palette.primary.main,
    border: '3px solid' + theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff'
    }
  },
  exportBtn_csvTag: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      color: '#fff'
    }
  },
  assignedButtons: {
    padding: '0.49rem 1.2rem 0.49rem 1.6rem',
    float: 'right',
    fontSize: '1.13rem',
    marginRight: '2.5rem',
    backgroundColor: '#FFF'
  },
  addNewQuestionBtn: {
    color: '#fff',
    fontSize: '1rem',
    marginLeft: '2.5rem',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      border: '3px solid #d6592d',
      backgroundColor: '#d6592d'
    }
  },
  saveChangesBtn: {
    float: 'right',
    color: '#fff',
    border: '3px solid #0CB800',
    backgroundColor: '#0CB800',
    '&:hover': {
      backgroundColor: '#098a00',
      border: '3px solid #098a00'
    }
  }
}))

export const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        )
      }
    }
  }
}))
