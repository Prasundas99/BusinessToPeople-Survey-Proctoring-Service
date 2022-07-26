import { Link } from 'react-router-dom'
import {
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material'

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import Logo from '../../../assets/Logo.png'

import { useTheme } from '@mui/material/styles'
import { drawerWidth, DrawerHeader, useStyles } from '../layouts.style.js'

import { SideNavItems } from './SideNavItems.js'
import { TopNavLogic } from '../TopNav/TopNav.js'

const MenuItems = () => {
  const classes = useStyles()
  const renderComponent = SideNavItems.map((item, index) => {
    return (
      <Link to={item.url} style={{ textDecoration: 'none' }}>
        <ListItem button key={index}>
          <ListItemText className={classes.sideNavItems} inset primary={item.title} />
        </ListItem>
      </Link>
    )
  })
  return renderComponent
}

export default function SideNav({ open, handleDrawerClose }) {
  const theme = useTheme()
  const { userName } = TopNavLogic()
  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        PaperProps={{
          sx: {
            backgroundColor: '#FAEEE0'
          }
        }}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        <DrawerHeader>
          <img src={Logo} alt="Logo" style={{ width: '5rem' }} />
          <IconButton onClick={handleDrawerClose} style={{ marginLeft: '6rem' }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <br />
        <Typography align="center" variant="h5">
          <b> Admin Name </b>
        </Typography>
        <Typography align="center" variant="subtitle2">
          {userName}
        </Typography>
        <List>
          <MenuItems />
        </List>
      </Drawer>
    </>
  )
}
