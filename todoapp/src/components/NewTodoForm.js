import React from 'react'

const NewTodoForm = (props) => {
  const [content, setContent] = React.useState('')

  let handleChange = (e) => {
    setContent(e.target.value)
  }
  let handleSubmit = (e) => {
    e.preventDefault()
    if (content.trim() === '') return
    props.handleNewTodo(content)
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} style={{border: '1px solid rebeccapurple'}}>
      <p><i style={{color: 'rebeccapurple'}}>NewTodoForm</i></p>
      <input type="text" name="content" value={content} onChange={handleChange} placeholder="Add new todo" onBlur={props.handleInputBlur} onFocus={props.handleInputFocus}/>
    </form>
  )
}

export default NewTodoForm