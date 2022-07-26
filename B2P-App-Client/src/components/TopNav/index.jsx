import { Button, Typography, Toolbar } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { AppBar, useStyles } from './layouts.style.js'
import { TopNavLogic } from './TopNav.js'

import LogoutIcon from "../../assets/LogoutIcon.svg"
import { Outlet } from 'react-router-dom'

export default function TopNav({ open, handleDrawerOpen }) {
  const { handelLogout, userName } = TopNavLogic()
  const classes = useStyles()
  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" className={classes.title}>
            B2P Client
          </Typography>
          <AccountCircleIcon className={classes.leftMenu} />
          <Typography variant="h6" noWrap component="div" className={classes.navItems}>
            {userName}
          </Typography>
          <Button
            variant="text"
            color="alternate"
            size="large"
            onClick={handelLogout}
            className={classes.navItems}
          >
            <img className={classes.logoutIcon} src={LogoutIcon} alt="Logout" />
            <b style={{ fontSize: '1.1rem', paddingBottom: '0.1rem' }}> Logout </b>
          </Button>
        </Toolbar>
      </AppBar>
      <br/><br/><br/><br/>
      <Outlet/>
    </>
  )
}
