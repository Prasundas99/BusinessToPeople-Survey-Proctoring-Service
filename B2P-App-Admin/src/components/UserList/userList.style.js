import { makeStyles } from '@mui/styles'
export const useStyles = makeStyles((theme) => ({
  editBtn: {
    position: 'relative',
    textDecoration: 'none',
    borderRadius: '10px',
    padding: '0.25rem 1.2rem',
    margin: 'auto 2rem',
    textTransform: 'none',
    fontSize: '1.05rem',
    color: '#FFFFFF',
    border: '3px solid' + theme.palette.primary.main,
    '&:hover': {
      backgroundColor: '#fff',
      color: theme.palette.primary.main
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[9],
    borderRadius: '10px',
    padding: theme.spacing(2, 4, 3),
    width: '35vw',
    zIndex: '4'
  },
  margin: {
    margin: '0.5rem 0'
  },
  editPopupBtn: {
    margin: '1vw 1.5rem 0 0.1rem',
    color: 'white',
    position: 'relative',
    borderRadius: '10px',
    padding: '0.45rem 1.2rem',
    textTransform: 'none',
    fontSize: '1rem'
  },
  editPopupBtn_cancel: {
    color: theme.palette.primary.main
  },
  style: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
  },
  headingFont: {
    fontSize: '1.03rem',
    cursor: 'pointer',
    textAlign: 'left',
    paddingLeft: '0.6vw',
    marginBottom: '0.5rem '
  },
  deleteIcon: {
    position: 'relative',
    color: '#444',
    width: '3.5rem',
    '&:hover': {
      color: '#fa5757'
    }
  },
  tooltiptext: {
    visibility: 'hidden',
    width: '220px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    textAlign: 'center',
    borderRadius: '6px',
    padding: '0.5rem 0.7rem',
    position: 'absolute',
    zIndex: '1',
    top: '-5px',
    left: '110%',
    '&::after': {
      content: '',
      position: 'absolute',
      top: '50%',
      right: '100%',
      marginTop: '-5px',
      borderWidth: '5px',
      borderStyle: 'solid',
      borderColor: 'transparent black transparent transparent'
    }
  },
  tooltip: {
    position: 'relative',
    display: 'inline-block',
    '&:hover > #tool': {
      visibility: 'visible'
    }
  },
  infoIcon: {
    fontSize: '1.17rem',
    color: '#555',
    marginLeft: '0.1vw',
    paddingBottom: '0.11vw',
    verticalAlign: 'middle'
  },
  sortAndExportBtn: {
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
  sortAndExportBtn_csvTag: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      color: '#fff'
    }
  },

  buttonsTable_inputButton: {
    margin: '0',
    padding: '0',
    background: 'none',
    color: 'inherit',
    border: 'none',
    outline: 'inherit',
    display: 'block',
    width: '90%'
  },
  search: {
    position: 'relative',
    backgroundColor: '#FFF',
    margin: '0vw 0vw 0.5vw',
    textDecoration: 'none',
    borderRadius: '6px',
    padding: '0rem 0.9rem',
    textTransform: 'none',
    border: '3px solid' + theme.palette.primary.main,
    '&:checked': {
      // border: '3px solid' + theme.palette.primary.main
    }
  },
  searchIcon: {
    padding: '0',
    height: '70%',
    position: 'absolute',
    top: '0.4vw',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'grey'
  },
  inputInput: {
    padding: theme.spacing(1, 0, 1, 0)
  },

  tableContainer: {
    borderRadius: '15px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    padding: '0 3vw'
  },
  tableHeading: {
    color: '#0080FF',
    fontSize: '1.14rem',
    fontWeight: '500'
  },
  tableCell_id: {
    fontSize: '1rem',
    width: '20vw'
  },
  tableCell_userName: {
    fontSize: '1rem',
    width: '15vw'
  },
  tableCell_password: {
    fontSize: '1rem',
    width: '16vw'
  },
  tableCell_date: {
    width: '16vw',
    fontSize: '1rem'
  }
}))
