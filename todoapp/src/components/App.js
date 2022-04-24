import React from 'react';
import {useLocalStorage} from '../hooks/useLocalStorage'

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
  let {todo, visibility} = state
  let {todos, editing} = todo
  let {filter} = visibility

  return (
    <div>
      <h1>TODOAPP</h1>
      <NewTodoForm handleNewTodo={handleNewTodo}/>
      {/* Visibility Filter */}
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
      />
    </div>
  );
  
}

export default App;
