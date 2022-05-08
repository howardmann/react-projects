import React from 'react';
import {useLocalStorage} from '../hooks/useLocalStorage'
import {useFilterKeyPress} from '../hooks/useFilterKeyPress'
import ContextInput from '../context/contextInput'

import reducer from '../reducers/index'
import NewTodoForm from './NewTodoForm'
import TodoList from './TodoList'
import Filter from './Filter'

function App() {
  let initialState = reducer(undefined, {})
  
  // custom hook useLocalStorage
  const [state, setState] = useLocalStorage(initialState, 'state')
  
  // reducer implementation of dispatch
  const dispatch = (action) => {
    setState(prevState => reducer(prevState, action))
  }
  
  // State handlers
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

  // State values from reducers
  let {todo, visibility} = state
  let {todos, editing} = todo
  let {filter} = visibility

  // Custom hook to filter shortcut keypress
  const [isInputFocused, setIsInputFocused] = useFilterKeyPress(dispatch)

  return (
    <div>
      <h1>TODOAPP</h1>

      {/* Using React Context for sharing global isInputFocused variable to detect if any text input is focus */}
      <ContextInput.Provider value={[isInputFocused, setIsInputFocused]}>
        <NewTodoForm handleNewTodo={handleNewTodo} />

        <Filter filter={filter} handleFilter={handleFilter}/>

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
        
      </ContextInput.Provider>
    </div>
  );
  
}

export default App;
