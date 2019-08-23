import React, { Component } from 'react';
import NewTodoForm from './NewTodoForm'
import TodoList from './TodoList'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      // list of todo objects
      todos: [{
        id: 1,
        content: 'Buy milk',
        done: false
      },{
        id: 2,
        content: 'Clean house',
        done: false
      },{
        id: 3,
        content: 'Get haircut',
        done: true
      },{
        id: 4,
        content: 'Edit this one',
        done: false
      }],
      // list of todo ids that are being edited
      editing: [4]
    }
  }
  handleMarkDone = (id) => {
    let newTodos = this.state.todos.map(t => {
      return t.id === id ? {...t, done: !t.done} : t
    })
    this.setState({todos: newTodos})
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
  handleNewTodo = (todo) => {
    this.setState({
      todos: [...this.state.todos, todo]
    })
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
    let newTodos = this.state.todos.filter(t => t.id !== id)
    this.setState({todos: newTodos})
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
