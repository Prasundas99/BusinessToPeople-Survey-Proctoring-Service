import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

import userModel from '../models/users.model.js'

dotenv.config()

// Admin Auth middleware for restrictions
export const adminRouteProtection = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await userModel.findById(decoded.id).select('-password')
      if (req.user.isAdmin) {
        next()
      }
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Unauthorized admin! token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Unauthorized! no token found')
  }
})

// worker Auth middleware for restrictions
export const workerRouteProtection = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await userModel.findById(decoded.id).select('-password')
      if (req.user.isWorker) {
        next()
      } else {
        res.status(401)
        const err = new Error('NOT A WORKER! token failed, FU')
        next(err)
      }
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Unauthorized field worker! token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Unauthorized! no token found')
  }
})

// Auth middleware for restrictions
export const routeProtection = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await userModel.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Unauthorized! token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Unauthorized! no token found')
  }
})
