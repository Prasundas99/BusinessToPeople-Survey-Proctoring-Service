import express from 'express'
import {
  addUser,
  changeUserPassword,
  deleteUser,
  loginUser,
  viewAllUsers,
  searchUser
} from '../controllers/user.controller.js'
import { adminRouteProtection } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').get(adminRouteProtection, viewAllUsers)
router.route('/add/:userType').post(addUser)
router.route('/login/:userType').post(loginUser)
router
  .route('/:userId')
  .delete(adminRouteProtection, deleteUser)
  .post(adminRouteProtection, changeUserPassword)

router.route('/search/:userType').post(adminRouteProtection, searchUser)
export default router
