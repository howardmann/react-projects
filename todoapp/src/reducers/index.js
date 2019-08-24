import combineReducers from './combineReducers'
import TodoReducer from './TodoReducer'
import VisibilityReducer from './VisibilityReducer'

const rootReducer = combineReducers({
  todo: TodoReducer,
  visibility: VisibilityReducer
})

export default rootReducer

