import MuiAppBar from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

export const drawerWidth = 360

export const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  //marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}))

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

export const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    margin: '1rem 1rem 1rem 0'
  },
  navItems: {
    fontWeight: 600,
    margin: '0 6rem 0 0.2rem',
    display: 'flex',
  },
  sideNavItems: {
    color: theme.palette.primary.main,
    fontWeight: 900
  },
  logoutIcon: {
    width: '1.4rem',
    marginRight: '0.67rem',
    verticalAlign: 'middle',
    paddingBottom: '0.3vw'
  },
  leftMenu: {

  },
  rightMenu: {
  }
}))
