import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { Main, DrawerHeader } from './layouts.style.js'
import TopNav from './TopNav/index.jsx'
import SideNav from './SideNav'

export default function Layouts () {
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <TopNav open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideNav
        DrawerHeader={DrawerHeader}
        open={open}
        handleDrawerClose={handleDrawerClose}
      />
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  )
}
