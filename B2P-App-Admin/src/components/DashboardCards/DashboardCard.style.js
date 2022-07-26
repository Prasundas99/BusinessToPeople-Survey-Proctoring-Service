import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => ({
  headingGradient: {
    backgroundImage: 'linear-gradient(90deg, #FF5C38, #FD9727)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  card: {
    position: 'relative',
    border: '3.5px solid #0E786F',
    height: '44.3vh',
    borderRadius: '30px',
    '&:hover': {
      boxShadow: '11px 9px 11px rgba(38, 38, 38, 0.2)'
    }
  },
  card_heading: {
    position: 'relative',
    margin: '0.7vw 0 0 0.95vw',
    fontSize: '1.96rem',
    fontWeight: '600',
    lineHeight: '40px',
    zIndex: '1'
  },
  card_subHeading: {
    position: 'relative',
    width: '17vw',
    margin: '0 0 0 0.95vw',
    fontSize: '1.19rem',
    fontWeight: '600',
    zIndex: '1'
  },
  card_description: {
    position: 'relative',
    color: '#6B6B6B',
    fontSize: '1.06rem',
    fontWeight: '500',
    margin: '0.9vw 0 0 0.95vw',
    width: '85%',
    lineHeight: '23px',
    zIndex: '1',
    '&:nth-child(2)': {
      margin: '0 0 1vw 1vw'
    }
  },
  card_button: {
    position: 'absolute',
    width: '3.5rem',
    left: '73%',
    bottom: '1.65vw',
    transition: 'all 0.2s ease-in-out',
    zIndex: '1',
    '&:hover': {
      transition: 'all 0.2s ease-in-out',
      transform: 'rotate(-45deg)',
      cursor: 'pointer'
    }
  },
  card_blueWaveBg: {
    position: 'absolute',
    width: '100%',
    left: '-0.1vw',
    bottom: '-0.82vw',
    transform: 'rotate(-1deg)',
    zIndex: '0'
  },
  card_getAllUsersList: {
    position: 'relative',
    color: '#6B6B6B',
    fontSize: '1.06rem',
    fontWeight: '500',
    margin: '0.4vw 0 0 0.9vw',
    width: '85%',
    lineHeight: '23px',
    '&::marker': {
      fontSize: '1.55rem'
    },
    '&:nth-child(1)::marker': {
      color: '#E64735'
    },
    '&:nth-child(2)::marker': {
      color: '#FD9727'
    },
    '&:nth-child(3)::marker': {
      color: '#0080FF'
    }
  },
  card_pieChart: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    paddingRight: '1vw',
    height: '6.5rem'
  },
  card_viewAllUsersBtn: {
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '0.85rem 2.4rem',
    marginTop: '1vw',
    borderRadius: '30px',
    backgroundColor: '#F45E00',
    color: theme.color.main,
    fontFamily: theme.typography.fontFamily,
    fontSize: '1.1rem',
    fontWeight: '500',
    border: 'none',
    '&:hover': {
      cursor: 'pointer',
      color: '#F45E00',
      backgroundColor: '#fff',
      border: '3px solid #F45E00',
      padding: '0.65rem 2.2rem'
    }
  }
}))
