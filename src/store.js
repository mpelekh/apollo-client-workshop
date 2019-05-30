import { createStore, applyMiddleware } from 'redux'
import rootReducer from './modules'
import initialState from './samples/initial-data'
import logger from './middleware/logger'
import thunk from 'redux-thunk'

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk, logger)
)

export default store
