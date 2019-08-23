let initialState = {
  // list of todo objects
  todos: [{
    id: 1,
    content: 'Buy milk',
    done: false
  }, {
    id: 2,
    content: 'Clean house',
    done: false
  }, {
    id: 3,
    content: 'Get haircut',
    done: true
  }, {
    id: 4,
    content: 'Edit this one',
    done: false
  }],
  // list of todo ids that are being edited
  editing: [4]
}

const TodoReducer = (state = initialState, action) => {
  if (action.type === 'ADD_TODO') {
    let newTodo = {
      id: Math.random(),
      content: action.content,
      done: false
    }    
    return {...state, todos: [...state.todos, newTodo]}
  }
  if (action.type === 'DELETE_TODO') {
    let newTodoArr = state.todos.filter(t => t.id !== action.id)
    return {...state, todos: newTodoArr}
  }
  if (action.type === 'MARK_DONE_TODO') {
    let newTodoArr = state.todos.map(t => {
      return t.id === action.id ? {...t, done: !t.done} : t
    })
    return {...state, todos: newTodoArr}
  }
  
  return state
}

export default TodoReducer

