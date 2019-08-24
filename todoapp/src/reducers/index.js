import combineReducers from './combineReducers'
import TodoReducer from './todo/TodoReducer'
import VisibilityReducer from './visibility/VisibilityReducer'

const rootReducer = combineReducers({
  todo: TodoReducer,
  visibility: VisibilityReducer
})

export default rootReducer

