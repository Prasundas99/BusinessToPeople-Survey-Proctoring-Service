import express from 'express'

const router = express.Router()
const time = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })

router.get('/', (req, res, next) => {
  return res.json({
    message: 'This is home route',
    deployTime: time
  })
})

export default router
