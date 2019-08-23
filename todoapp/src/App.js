import React, { Component } from 'react';

import TodoReducer from './reducers/TodoReducer'
import NewTodoForm from './NewTodoForm'
import TodoList from './TodoList'

class App extends Component {
  constructor(props){
    super(props)
    this.state = TodoReducer(undefined, {})
  }
  dispatch(action) {
    this.setState(prevState => TodoReducer(prevState, action))
  }
  handleMarkDone = (id) => {
    this.dispatch({type: 'MARK_DONE_TODO', id})
  }
  handleMarkEdit = (id) => {
    this.dispatch({type: 'MARK_EDIT_TODO', id})
  }
  handleMarkEditUndo = (id) => {
    this.dispatch({type: 'MARK_EDIT_UNDO_TODO', id})
  }
  handleNewTodo = (content) => {
    this.dispatch({type: 'ADD_TODO', content})
  }
  handleEditTodo = ({id, content, done}) => {
    this.dispatch({type: 'EDIT_TODO', id, content, done})
  }
  handleDeleteTodo = (id) => {
    this.dispatch({type: 'DELETE_TODO', id})
  }
  render() {
    return (
      <div>
        <h1>TODOAPP</h1>
        <NewTodoForm handleNewTodo={this.handleNewTodo}/>

        <TodoList 
          todos={this.state.todos}
          editing={this.state.editing}
          handleMarkDone={this.handleMarkDone}
          handleMarkEdit={this.handleMarkEdit}
          handleDeleteTodo={this.handleDeleteTodo}
          handleEditTodo={this.handleEditTodo}
          handleMarkEditUndo={this.handleMarkEditUndo}
        />
      </div>
    );
  }
}

export default App;
