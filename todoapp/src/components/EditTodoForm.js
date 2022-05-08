import React from 'react'
import ContextInput from '../context/contextInput'

const EditTodoForm = (props) => {
  const [content, setContent] = React.useState(props.content)
  const [done, setDone] = React.useState(props.done)
  const [,setIsInputFocused] = React.useContext(ContextInput)

  let handleChange = (e) => {
    setContent(e.target.value)
  }
  let handleChecked = (e) => {
    setDone(!done)
  }
  let handleSubmit = (e) => {
    e.preventDefault()

    props.handleEditTodo({
      id: props.id,
      content: content,
      done: done
    })
  }
  return (
    <div style={{border: '1px solid blue'}}>
      <i style={{color: 'blue'}}>EditTodoForm</i>
      <form onSubmit={handleSubmit}>
        <input type="text" name="content" value={content} onChange={handleChange} onBlur={() => setIsInputFocused(false)} onFocus={() => setIsInputFocused(true)} />
        <input type="checkbox" name="done" checked={done} onChange={handleChecked}/>
        <input type="submit" value="Update"/>
      </form>
      <button onClick={() => props.handleMarkEditUndo(props.id)}>Undo Edit</button>
    </div>

  )
}

export default EditTodoForm