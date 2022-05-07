import React from 'react';
import {useLocalStorage} from '../hooks/useLocalStorage'
import {useKeyPress} from '../hooks/useKeyPress'

import reducer from '../reducers/index'
import NewTodoForm from './NewTodoForm'
import TodoList from './TodoList'

function App() {
  let initialState = reducer(undefined, {})
  
  // custom hook useLocalStorage
  const [state, setState] = useLocalStorage(initialState, 'state')
  

  // // Implementation of useLocalStorage without custom hook
  // let initialState = JSON.parse(localStorage.getItem('state')) || reducer(undefined, {})
  // const [state, setState] = useState(initialState)
  // // side effect update localstorage for state when state changes
  // useEffect(() => {
  //   localStorage.setItem('state', JSON.stringify(state))
  // },[state])

  // reducer implementation of dispatch
  const dispatch = (action) => {
    setState(prevState => reducer(prevState, action))
  }
  
  let handleMarkDone = (id) => {
    dispatch({type: 'MARK_DONE_TODO', id})
  }
  let handleMarkEdit = (id) => {
    dispatch({type: 'MARK_EDIT_TODO', id})
  }
  let handleMarkEditUndo = (id) => {
    dispatch({type: 'MARK_EDIT_UNDO_TODO', id})
  }
  let handleNewTodo = (content) => {
    dispatch({type: 'ADD_TODO', content})
    dispatch({type: 'SHOW_ALL'})
  }
  let handleEditTodo = ({id, content, done}) => {
    dispatch({type: 'EDIT_TODO', id, content, done})
  }
  let handleDeleteTodo = (id) => {
    dispatch({type: 'DELETE_TODO', id})
  }
  let handleFilter = (e) => {
    let filter = e.target.value 
    dispatch({type: filter})
  }
  // custom hook window event listener detect if key pressed, return boolean
  const pressA = useKeyPress("a")
  const pressD = useKeyPress('d')
  const pressN = useKeyPress('n')
  // detect if input is in focus
  const [isInputFocused, setIsInputFocused] = React.useState(false)
  let handleInputBlur = () => setIsInputFocused(false)
  let handleInputFocus = () => setIsInputFocused(true)

  // useEffect hook detect changes when input not in focus in keys above, if true dispatch filter change
  React.useEffect(() => {
    if (!isInputFocused) {
      if (pressA) {
        dispatch({type: 'SHOW_ALL'})
      }
      if (pressD) {
        dispatch({type: 'SHOW_DONE'})
      }
      if (pressN) {
        dispatch({type:'SHOW_NOT_DONE'})
      }
    }
  },[pressA, pressD, pressN])

  let {todo, visibility} = state
  let {todos, editing} = todo
  let {filter} = visibility

  return (
    <div>
      <h1>TODOAPP</h1>
      <NewTodoForm handleNewTodo={handleNewTodo} handleInputBlur={handleInputBlur} handleInputFocus={handleInputFocus} />
      {/* Visibility Filter */}
      <p>Filter: <i>shortcut keys: a (all), d (done), n (not done)</i> </p>
      <select value={filter} onChange={handleFilter}>
        <option value="SHOW_ALL">SHOW ALL</option>
        <option value="SHOW_DONE">DONE</option>
        <option value="SHOW_NOT_DONE">NOT DONE</option>
      </select>

      <TodoList 
        todos={todos}
        editing={editing}
        handleMarkDone={handleMarkDone}
        handleMarkEdit={handleMarkEdit}
        handleDeleteTodo={handleDeleteTodo}
        handleEditTodo={handleEditTodo}
        handleMarkEditUndo={handleMarkEditUndo}
        filter={filter}
        handleInputBlur={handleInputBlur} 
        handleInputFocus={handleInputFocus}        
      />
    </div>
  );
  
}

export default App;
