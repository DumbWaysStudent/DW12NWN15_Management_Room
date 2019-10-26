import { createStore, combineReducers, applyMiddleware } from 'redux'

// Reducers
import user from "./_reducers/user"
import room from "./_reducers/room"

// Middlewares
import { logger, promise } from './middlewares' 

const reducers = combineReducers({
  user,
  room
})

const store = createStore(
  reducers, 
  applyMiddleware(promise, logger)
)

export default store