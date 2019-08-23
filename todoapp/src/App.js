import React, { Component } from 'react';
import NewTodoForm from './NewTodoForm'
import TodoList from './TodoList'
import TodoReducer from './reducers/TodoReducer'

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
    this.setState({
      editing: [...this.state.editing, id]
    })
  }
  handleMarkEditUndo = (id) => {
    let newEditing = this.state.editing.filter(editId => editId !== id)
    this.setState({editing: newEditing})
  }
  handleNewTodo = (content) => {
    this.dispatch({type: 'ADD_TODO', content})
  }
  handleEditTodo = (todo) => {
    let newTodos = this.state.todos.map(t => {
      return t.id === todo.id ? todo : t
    })
    let newEditing = this.state.editing.filter(id => id !== todo.id)
    this.setState({
      todos: newTodos,
      editing: newEditing
    })
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
