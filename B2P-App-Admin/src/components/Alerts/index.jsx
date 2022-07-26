import { Alert } from '@mui/material'
import React from 'react'

function Alerts ({ severity, info }) {
  return (
    <>
      <Alert style={{ marginTop: '8px', width: '99%' }} variant='outlined' severity={severity}>
        {info}
      </Alert>
    </>
  )
}

export default Alerts
