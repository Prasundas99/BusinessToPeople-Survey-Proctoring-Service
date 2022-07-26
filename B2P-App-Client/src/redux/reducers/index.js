import { combineReducers } from 'redux'
import { userLoginReducer } from './authReducer.js'
import { viewQuestionReducer } from './questionsReducer.js'
const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  viewQuestion: viewQuestionReducer,
})

export default rootReducer
