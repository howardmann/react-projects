import combineReducers from './combineReducers'
import TodoReducer from './TodoReducer'
import VisibilityReducer from './VisibilityReducer'

const rootReducer = combineReducers({
  TodoReducer,
  VisibilityReducer
})

export default rootReducer

