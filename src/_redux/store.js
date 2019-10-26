import { createStore, combineReducers, applyMiddleware } from 'redux'

// Reducers
import user from "./_reducers/user"

// Middlewares
import { logger, promise } from './middlewares' 

const reducers = combineReducers({
  user
})

const store = createStore(
  reducers, 
  applyMiddleware(promise, logger)
)

export default store