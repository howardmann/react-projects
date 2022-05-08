import React from 'react'
import ContextInput from '../context/contextInput'

const NewTodoForm = (props) => {
  const [content, setContent] = React.useState('')
  const [,setIsInputFocused] = React.useContext(ContextInput)

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
      <input type="text" name="content" value={content} onChange={handleChange} placeholder="Add new todo" onBlur={() => setIsInputFocused(false)} onFocus={() => setIsInputFocused(true)}/>
    </form>
  )
}

export default NewTodoForm