import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index.js'

// GET user info from localstorage
const userInfoFromLocalstorage = JSON.parse(window.localStorage.getItem('userData'))

const initialState = {
  userLogin: {
    loading: false,
    error: null,
    data: userInfoFromLocalstorage
  }
}

const middlewares = [thunk]
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
)

export default store
