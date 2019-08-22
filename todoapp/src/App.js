import React, { Component } from 'react';

const Todo = (props) => (
  <div style={{border: '1px solid hotpink'}}>
    <i style={{color: 'hotpink'}}>Todo</i>
    {/* Content and Checkbox to mark done */}
    <p style={{cursor: 'pointer'}} onClick={() => props.handleMarkDone(props.id)}>
      {props.done ? <s>{props.content}</s> : props.content}
      <input type="checkbox" onChange={() => props.handleMarkDone(props.id)} checked={props.done}/>
    </p>
    {/* Edit and Delete Buttons */}
    <button onClick={() => props.handleDeleteTodo(props.id)}>Delete</button>
    <button onClick={() => props.handleMarkEdit(props.id)}>Edit</button>
  </div>
)
class EditTodoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: this.props.content,
      done: this.props.done
    }
  }
  handleChange = (e) => {
    this.setState({content: e.target.value})
  }
  handleChecked = (e) => {
    this.setState({
      done: !this.state.done
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    
    this.props.handleEditTodo({
      id: this.props.id,
      content: this.state.content,
      done: this.state.done
    })
  }
  render(){
    return (
      <div style={{border: '1px solid blue'}}>
        <i style={{color: 'blue'}}>EditTodoForm</i>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="content" value={this.state.content} onChange={this.handleChange}/>
          <input type="checkbox" name="done" checked={this.state.done} onChange={this.handleChecked}/>
          <input type="submit" value="Update"/>
        </form>
        <button onClick={() => this.props.handleMarkEditUndo(this.props.id)}>Undo Edit</button>
      </div>
    )
  }
}

const TodoList = (props) => (
  <div style={{border: '1px solid green'}}>
    <i style={{color: 'green'}}>TodoList</i>
    {props.todos.map(t => 
      props.editing.includes(t.id)
        ? <EditTodoForm
            key={t.id}
            id={t.id}
            content={t.content}
            done={t.done}
            handleEditTodo={props.handleEditTodo}
            handleMarkEditUndo={props.handleMarkEditUndo}
          />
        : <Todo 
            key={t.id}
            id={t.id}
            content={t.content} 
            done={t.done}
            handleMarkDone={props.handleMarkDone}
            handleDeleteTodo={props.handleDeleteTodo}
            handleMarkEdit={props.handleMarkEdit}
          />
    )}
  </div>
)

class NewTodoForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      content: ''
    }
  }
  handleChange = (e) => {
    this.setState({content: e.target.value})
  }
  handleSubmit = (e) => {
    e.preventDefault()
    let todo = {
      id: Math.random(),
      content: this.state.content,
      done: false
    }
    this.props.handleNewTodo(todo)
    this.setState({content: ''})
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit} style={{border: '1px solid rebeccapurple'}}>
        <p><i style={{color: 'rebeccapurple'}}>NewTodoForm</i></p>
        <input type="text" name="content" value={this.state.content} onChange={this.handleChange} placeholder="Add new todo"/>
      </form>
    )
  }
}

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
