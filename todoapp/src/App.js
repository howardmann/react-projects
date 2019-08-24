import React, { Component } from 'react';

import reducer from './reducers'
import NewTodoForm from './NewTodoForm'
import TodoList from './TodoList'

class App extends Component {
  constructor(props){
    super(props)
    this.state = reducer(undefined, {})
  }
  dispatch(action) {
    this.setState(prevState => reducer(prevState, action))
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
  handleFilter = (filter) => {
    this.dispatch({type: filter})
  }
  render() {
    let {
      TodoReducer: {todos, editing}, 
      VisibilityReducer: {filter}
    } = this.state
    
    return (
      <div>
        <h1>TODOAPP</h1>
        <NewTodoForm handleNewTodo={this.handleNewTodo}/>

        {/* Visibility Filter buttons */}
        <button onClick={() => this.handleFilter('SHOW_ALL')}>ALL</button>
        <button onClick={() => this.handleFilter('SHOW_DONE')}>DONE</button>
        <button onClick={() => this.handleFilter('SHOW_NOT_DONE')}>NOT DONE</button>

        <TodoList 
          todos={todos}
          editing={editing}
          handleMarkDone={this.handleMarkDone}
          handleMarkEdit={this.handleMarkEdit}
          handleDeleteTodo={this.handleDeleteTodo}
          handleEditTodo={this.handleEditTodo}
          handleMarkEditUndo={this.handleMarkEditUndo}
          filter={filter}
        />
      </div>
    );
  }
}

export default App;
