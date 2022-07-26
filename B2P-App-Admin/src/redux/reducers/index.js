import { combineReducers } from 'redux'
import { userLoginReducer } from './authReducer.js'
import { viewUserReducer, addUserReducer, searchAllUsersReducer } from './userReducer.js'
import {
  viewQuestionReducer,
  addQuestionReducer,
  viewSingleQuestionSetReducer,
  deleteSingleQuestionReducer
} from './questionsReducer.js'
import { getSingleAnswerReducer } from './answerReducer.js'

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  viewUser: viewUserReducer,
  addUser: addUserReducer,
  viewQuestion: viewQuestionReducer,
  viewSingleQuestionSet: viewSingleQuestionSetReducer,
  getSingleAnswer: getSingleAnswerReducer,
  addQuestion: addQuestionReducer,
  searchAllUsers: searchAllUsersReducer,
  deleteSingleQuestion: deleteSingleQuestionReducer
})

export default rootReducer
