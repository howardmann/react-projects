import React, {Component} from 'react'

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

export default NewTodoForm