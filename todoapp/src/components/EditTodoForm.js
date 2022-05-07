import React, {Component} from 'react'

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
          <input type="text" name="content" value={this.state.content} onChange={this.handleChange} onBlur={this.props.handleInputBlur} onFocus={this.props.handleInputFocus}/>
          <input type="checkbox" name="done" checked={this.state.done} onChange={this.handleChecked}/>
          <input type="submit" value="Update"/>
        </form>
        <button onClick={() => this.props.handleMarkEditUndo(this.props.id)}>Undo Edit</button>
      </div>
    )
  }
}

export default EditTodoForm