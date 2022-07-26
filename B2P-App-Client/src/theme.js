import { createTheme, responsiveFontSizes } from '@mui/material'

// For custom theme in MUI
const theme = createTheme({
  // color pallete for MUI theme
  palette: {
    mode: 'light',
    primary: { main: '#FF6D3A' }, // deep orange
    secondary: { main: '#6B6B6B' }, // Grey
    alternate: { main: '#161616' }, // Black
    error: { main: '#F8485E' }, // red
    background: {
      default: '#FFF6F2' //light orange
    }
  },
  typography: {
    h2: {
      fontWeight: 500,
      fontFamily: "'Futura PT', 'Montserrat', Helvetica, sans-serif"
    },
    button: {
      textTransform: 'none'
    },
    fontFamily: ['"Montserrat","Futura PT", "Ubuntu", sans-serif']
  },
  color: {
    main: '#fff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)'
  }
})

export default responsiveFontSizes(theme)
