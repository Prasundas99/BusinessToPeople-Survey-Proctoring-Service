import { Box, Tabs, Tab } from '@mui/material'
import SwipeableViews from 'react-swipeable-views'
import UserList from '../../components/UserList/index.jsx'
import { TabPanel, UserLogic, a11yProps } from './User.js'
import { useStyles } from './user.style.js'
import BreadcrumbSample from '../../components/BreadcrumbSample/BreadcrumbSample'

export default function Users () {
  const { theme, value, handleChange, handleChangeIndex } = UserLogic()
  const classes = useStyles()
  return (
    <>
      <BreadcrumbSample pageName='Get All Users' />
      <Box>
        <Tabs
          style={{ margin: '0.7rem 0 2rem' }}
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          aria-label='Users List'
          selectionFollowsFocus
          centered
        >
          <Tab label='Admin' {...a11yProps(0)} className={classes.itemBox} />
          <Tab label='Client' {...a11yProps(1)} className={classes.itemBox} />
          <Tab label='Worker' {...a11yProps(2)} className={classes.itemBox} />
        </Tabs>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <UserList userType='admin' />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <UserList userType='client' />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <UserList userType='worker' />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </>
  )
}
