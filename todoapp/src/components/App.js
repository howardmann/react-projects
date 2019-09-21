import React, { Component } from 'react';

import reducer from '../reducers/index'
import NewTodoForm from './NewTodoForm'
import TodoList from './TodoList'

class App extends Component {
  constructor(props){
    super(props)
    // Use prev localstorage state || initialValue
    let state = JSON.parse(localStorage.getItem('state')) || reducer(undefined, {})    
    this.state = state
  }  
  async dispatch(action) {
    // update UI state
    await this.setState(prevState => reducer(prevState, action))
    // persist to localstorage
    localStorage.setItem('state', JSON.stringify(this.state))
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
    this.dispatch({type: 'SHOW_ALL'})
  }
  handleEditTodo = ({id, content, done}) => {
    this.dispatch({type: 'EDIT_TODO', id, content, done})
  }
  handleDeleteTodo = (id) => {
    this.dispatch({type: 'DELETE_TODO', id})
  }
  handleFilter = (e) => {
    let filter = e.target.value 
    this.dispatch({type: filter})
  }
  render() {
    let {todo, visibility} = this.state
    let {todos, editing} = todo
    let {filter} = visibility

    return (
      <div>
        <h1>TODOAPP</h1>
        <NewTodoForm handleNewTodo={this.handleNewTodo}/>
        {/* Visibility Filter */}
        <select value={filter} onChange={this.handleFilter}>
          <option value="SHOW_ALL">SHOW ALL</option>
          <option value="SHOW_DONE">DONE</option>
          <option value="SHOW_NOT_DONE">NOT DONE</option>
        </select>

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
