import express from 'express'
import {
  addQuestion,
  viewQuestionSet,
  viewSingleQuestionSet,
  deleteQuestionSet,
  editQuestionSet,
  postAnswer,
  searchQuestion,
  editSingleQuestion,
  deleteSingleQuestion,
  getSingleAnswer
} from '../controllers/questionSet.controller.js'
import {
  routeProtection,
  adminRouteProtection,
  workerRouteProtection
} from '../middlewares/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .post(adminRouteProtection, addQuestion)
  .get(routeProtection, viewQuestionSet)

router.route('/search').post(adminRouteProtection, searchQuestion)
router
  .route('/:questionId/question/:questionId')
  .put(adminRouteProtection, editSingleQuestion)
  .delete(adminRouteProtection, deleteSingleQuestion)

router
  .route('/:questionId')
  .get(routeProtection, viewSingleQuestionSet)
  .delete(adminRouteProtection, deleteQuestionSet)
  .put(adminRouteProtection, editQuestionSet)

router.route('/:questionSetID/answer').post(workerRouteProtection, postAnswer)
router
  .route('/answer/:questionId/:workerId')
  .get(adminRouteProtection, getSingleAnswer)

export default router
