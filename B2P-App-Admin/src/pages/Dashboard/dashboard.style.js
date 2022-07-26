import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
  headingGradient: {
    backgroundImage: 'linear-gradient(90deg, #FF5C38, yellow)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  dashboard_heading: {
    fontFamily: "'Futura PT','Montserrat', Helvetica, sans-serif !important",
    fontWeight: 'bold',
    paddingTop: '0rem '
  },
  dashboard_headingWelcome: {
    margin: '0.69rem 0',
    fontWeight: 500,
    color: '#000'
  },
  firstRowCards: {
    margin: '1rem 0'
  },
  firstRowCard_heading: {
    position: 'relative',
    marginTop: '0.95vw',
    paddingLeft: '1rem',
    fontSize: '1.74rem',
    fontWeight: '600'
  },
  overviewCard: {
    background: '#FFF3E5',
    border: '3.5px solid #FAC88F',
    height: '25.95vh'
  },
  overviewCard_heading: {
    fontSize: '1.74rem',
    paddingLeft: '1.5rem'
  },
  overviewCard_grid: {
    position: 'relative',
    paddingLeft: '1.78vw',
    top: '0'
  },
  overviewCard_grid_heading: {
    fontSize: '1.08rem',
    color: '#0E786F',
    fontWeight: '500'
  },
  overviewCard_grid_data: {
    color: theme.palette.primary.main,
    fontSize: '3rem',
    fontWeight: '500',
    padding: '0',
    borderTop: '2px solid #0080FF',
    width: '76%',
    lineHeight: '3.3rem'
  },
  createQuestionCard: {
    position: 'relative',
    backgroundColor: '#fff',
    border: '3.5px solid #FD9727',
    boxSizing: 'border-box',
    height: '25.95vh',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transition: 'all 0.2s ease-in-out',
      boxShadow: '0px 9px 11px rgba(38, 38, 38, 0.2)'
    }
  },
  createQuestionCard_heading: {
    fontSize: '2rem',
    margin: '0',
    marginTop: '1.05vw',
    paddingLeft: '1.5rem',
    backgroundImage: 'linear-gradient(90deg, #FF5C38, #FD9727)'
  },
  createQuestionCard_description: {
    position: 'relative',
    color: '#6B6B6B',
    width: '65%'
  },
  createQuestionCard_discover: {
    fontWeight: '600',
    color: '#0E786F',
    cursor: 'pointer'
  },
  createQuestionCard_discoverIcon: {
    verticalAlign: 'middle',
    marginLeft: '0.5rem',
    paddingBottom: '0.12rem'
  }
}))
