import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
// db connection import
import mongoDbConnection from './config/db.js'
// Error handellers
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
// Router import
import HomeRouter from './routes/homeRouter.js'
import UserRouter from './routes/user.js'
import QuestionSetRouter from './routes/questionSet.js'
import commonRouter from './routes/common.js'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Mongodb connection
mongoDbConnection()

// Middleware
app.use(morgan('dev'))
app.use(cors())

// Routes
app.use('/', HomeRouter)
app.use('/user', UserRouter)
app.use('/question-set', QuestionSetRouter)
app.use('/common', commonRouter)

// Error Handellers
app.use(notFound)
app.use(errorHandler)

// Server Listen
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
