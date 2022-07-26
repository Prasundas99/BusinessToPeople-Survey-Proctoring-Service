import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
  buttonsTable_inputButton: {
    margin: '0',
    marginLeft: '1rem',
    padding: '0',
    background: 'none',
    color: 'inherit',
    border: 'none',
    outline: 'inherit',
    width: '40%'
  },
  search: {
    position: 'relative',
    backgroundColor: '#FFF',
    margin: '0vw 0vw 0.5vw',
    textDecoration: 'none',
    borderRadius: '6px',
    padding: '0rem',
    textTransform: 'none',
    border: '3px solid' + theme.palette.primary.main,
    '&:checked': {
      // border: '3px solid' + theme.palette.primary.main
    }
  },
  inputInput: {
    padding: theme.spacing(1, 0, 1, 0)
  },
  searchBtn: {
    position: 'relative',
    textDecoration: 'none',
    borderRadius: '6px',
    padding: '0.25rem 1rem',
    textTransform: 'none',
    fontSize: '1.05rem',
    color: '#FFFFFF',
    border: '3px solid' + theme.palette.primary.main,
    marginLeft: '1.5rem',
    marginBottom: '0.17rem',
    '&:hover': {
      backgroundColor: '#fff',
      color: theme.palette.primary.main
    }
  },
  selectedClientsAndWorkers: {
    marginRight: '0.5rem',
    backgroundColor: '#d5ffa6',
    borderRadius: '20px',
    display: 'inline',
    padding: '0.3rem 0.5rem 0.3rem 1rem'
  },
  closeBtn_selectedUsers: {
    cursor: 'pointer',
    verticalAlign: 'middle',
    fontSize: '1.27rem',
    paddingBottom: '0.1rem',
    marginLeft: '0.4rem'
  },
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
  saveChangesBtn: {
    float: 'right',
    color: '#fff',
    border: '3px solid #0CB800',
    backgroundColor: '#0CB800',
    '&:hover': {
      backgroundColor: '#098a00',
      border: '3px solid #098a00'
    }
  },
  addQuestionBtn: {
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
    border: '3px solid' + theme.palette.primary.main,
    '&:hover': {
      backgroundColor: '#FFF6F2',
      color: theme.palette.primary.main,
      border: '3px solid' + theme.palette.primary.main
    }
  },
  workerPaper: {
    width: '72%',
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '1.8rem 1.8rem 2rem',
    marginBottom: '2rem'
  },
  workPaper_form: {
    position: 'relative',
    width: '95%',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    justifyContent: 'space-between'
  },
  workerPaper_form_textField: {
    marginRight: '1rem',
    width: '39%'
  },
  workerPaper_selectedWorkers: {
    fontSize: '1rem',
    width: '30%'
  },
  workerPaper_table: {
    margin: '2rem 0',
    paddingLeft: '0.6rem'
  },
  tableHeading: {
    color: '#0080FF',
    fontSize: '1rem',
    fontWeight: '500'
  }
}))
