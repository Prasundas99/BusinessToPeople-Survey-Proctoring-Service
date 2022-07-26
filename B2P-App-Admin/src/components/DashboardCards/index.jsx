import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Card, CardActions, CardContent } from '@mui/material'
import clsx from 'clsx'
import ArrowBtn from '../../assets/Arrow.svg'
import BlueWaveBg from '../../assets/BlueWave.png'

import { PieChart } from 'react-minimal-pie-chart'
import { cardContents } from './DashboardCardContent.js'
import { useStyles } from './DashboardCard.style'

function SecondRowCards ({adminCount=0, clientCount=0, workerCount=0}) {
  const classes = useStyles()

  const dataMock = [
    { title: 'Admin', value: adminCount, color: '#E64735' },
    { title: 'Client', value: clientCount, color: '#FD9727' },
    { title: 'Worker', value: workerCount, color: '#0080FF' }
  ]

  return (
    <>
      <Grid container spacing={6}>
        {cardContents.map((card) => {
          return (
            <Grid item key={card.heading} sm={12} md={6}>
              <Card className={clsx(classes.card)} style={card.cardAlignment}>
                <CardContent style={{ paddingBottom: '0' }}>
                  <h4 className={clsx(classes.headingGradient, classes.card_heading)}>
                    {card.heading}
                  </h4>
                  {card.subHeading && (
                    <h5
                      className={clsx(classes.headingGradient, classes.card_subHeading)}
                    >
                      {card.subHeading}
                    </h5>
                  )}
                  <h5 className={classes.card_description}>{card.description}</h5>
                </CardContent>
                {card.heading === 'Get All Users'
                  ? (
                    <div>
                      <Grid container>
                        <Grid item md={6}>
                          <ul type='square'>
                            <li className={classes.card_getAllUsersList}>Admin : {dataMock[0].value}</li>
                            <li className={classes.card_getAllUsersList}>Client : {dataMock[1].value}</li>
                            <li className={classes.card_getAllUsersList}>Worker: {dataMock[2].value}</li>
                          </ul>
                        </Grid>
                        <Grid item md={6}>
                          <PieChart
                            data={dataMock}
                            lineWidth={34}
                            className={classes.card_pieChart}
                          />
                        </Grid>
                      </Grid>
                      <Link to='/users'>
                        <button className={classes.card_viewAllUsersBtn}>
                          {card.button}
                        </button>
                      </Link>
                    </div>
                    )
                  : (
                    <CardActions>
                      <Link to={card.redirectLink}>
                        <img src={ArrowBtn} alt='Button' className={classes.card_button} />
                      </Link>
                    </CardActions>
                    )}
                {card.heading !== 'Get All Users' && (
                  <img
                    src={BlueWaveBg}
                    alt='Background'
                    className={classes.card_blueWaveBg}
                  />
                )}
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default SecondRowCards
