import React from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { getAllQuestions } from '../../redux/actions/questionActions.js'
import { useEffect } from 'react'
import { UserListLogic } from '../../components/UserList/UserList.js'
import { Link } from 'react-router-dom'
import { Container, Grid, Typography, Card } from '@mui/material'
import EastIcon from '@mui/icons-material/East'

import SecondRowCards from '../../components/DashboardCards'

import { useStyles } from './dashboard.style.js'

function Dashboard () {
  const classes = useStyles()
  const { clientRows , adminRows, workerRows} = UserListLogic()
  const { data } = useSelector((state) => state.viewQuestion)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllQuestions())
  }, [dispatch])
  return (
    <Container>
      <Typography variant='h2' className={classes.dashboard_heading}>
        Dashboard
      </Typography>
      <Typography variant='h6' className={classes.dashboard_headingWelcome}>
        Welcome back, Admin
      </Typography>

      {/* Overview Card */}
      <Grid container spacing={0} className={classes.firstRowCards}>
        <Grid item md={5}>
          <Card
            className={classes.overviewCard}
            style={{ background: '#FFF3E5', borderRadius: '14px' }}
          >
            <h2
              className={clsx(
                classes.firstRowCard_heading,
                classes.overviewCard_heading,
                classes.headingGradient
              )}
            >
              Overview
            </h2>
            <Grid container style={{ marginTop: '0' }}>
              <Grid item md={6} className={classes.overviewCard_grid}>
                <Typography variant='title' className={classes.overviewCard_grid_heading}>
                  Question Sets
                </Typography>
                <Typography
                  variant='h6'
                  style={{ fontSize: '3rem', lineHeight: '3.4rem' }}
                  className={classes.overviewCard_grid_data}
                >
                 {data && data.body.length}
                </Typography>
              </Grid>
              <Grid item md={6} className={classes.overviewCard_grid}>
                <Typography variant='title' className={classes.overviewCard_grid_heading}>
                  Clients count
                </Typography>
                <Typography
                  variant='h6'
                  style={{ fontSize: '3rem', lineHeight: '3.4rem' }}
                  className={classes.overviewCard_grid_data}
                >
                  {clientRows.length}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Create Question Card */}
        <Grid item sm={12} md={7}>
          <Card
            style={{ borderRadius: '20px', marginLeft: '1.8vw' }}
            className={classes.createQuestionCard}
          >
            <h4
              style={{ marginTop: '1.05vw' }}
              className={clsx(
                classes.firstRowCard_heading,
                classes.headingGradient,
                classes.createQuestionCard_heading
              )}
            >
              Create A Question Set
            </h4>
            <Typography
              variant='h6'
              style={{
                fontSize: '1.06rem',
                marginLeft: '1.78vw',
                marginBottom: '1.1vw'
              }}
              className={classes.createQuestionCard_description}
            >
              Create a question set to capture your feedback.
            </Typography>

            <Link to='/question-set/add' style={{ textDecoration: 'none' }}>
              <Typography
                variant='title'
                style={{ fontSize: '1.2rem', marginLeft: '1.78vw' }}
                className={classes.createQuestionCard_discover}
              >
                Discover more
                <EastIcon className={classes.createQuestionCard_discoverIcon} />
              </Typography>
            </Link>
          </Card>
        </Grid>
      </Grid>
      <SecondRowCards clientCount={clientRows.length} workerCount={workerRows.length} adminCount={adminRows.length} />
    </Container>
  )
}

export default Dashboard
