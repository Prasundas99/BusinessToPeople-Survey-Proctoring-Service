import React from 'react'
import { Typography, Container, Breadcrumbs } from '@mui/material'
import { Link } from 'react-router-dom'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useStyles } from './BreadcrumbSample.style'

const Breadcrumb = ({ pageName }) => {
  const classes = useStyles()
  return (
    <Container maxWidth='xl' style={{ width: '96%' }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize='small' />}
        className={classes.breadcrumbs}
        aria-label='breadcrumb'
      >
        <Link to='/' className={classes.heading}>
          <strong>B2P Admin</strong>{' '}
        </Link>
        <Typography align='left' className={classes.subHeading}>
          {pageName}
        </Typography>
      </Breadcrumbs>
    </Container>
  )
}

export default Breadcrumb
