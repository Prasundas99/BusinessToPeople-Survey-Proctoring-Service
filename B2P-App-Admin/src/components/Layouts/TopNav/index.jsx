import { Button, Typography, Toolbar } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { AppBar, useStyles } from '../layouts.style.js'
import { TopNavLogic } from './TopNav.js'

import Logo from '../../../assets/Logo.png'
import LogoutIcon from '../../../assets/LogoutIcon.svg'

export default function TopNav({ open, handleDrawerOpen }) {
  const { handelLogout, userName } = TopNavLogic()
  const classes = useStyles()
  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
            className={classes.leftMenu}
          >
            <MenuIcon />
          </IconButton>

          <img src={Logo} alt="Logo" style={{ width: '5rem' }} />
          <div style={{ position: 'relative', left: '65%', display: 'flex' }}>
            <AccountCircleIcon className={classes.leftMenu} style={{ margin: 'auto' }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              className={classes.navItems}
              style={{ margin: 'auto 6rem auto 0.2rem' }}
            >
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

            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
              className={classes.rightMenu}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}
