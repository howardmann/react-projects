import React from 'react'

const Todo = (props) => (
  <div style={{border: '1px solid hotpink'}}>
    <i style={{color: 'hotpink'}}>Todo</i>
    {/* Content and Checkbox to mark done */}
    <p style={{cursor: 'pointer'}} onClick={() => props.handleMarkDone(props.id)}>
      {props.done ? <s>{props.content}</s> : props.content} 
    </p>
    <input type="checkbox" onChange={() => props.handleMarkDone(props.id)} checked={props.done}/>
    {/* Edit and Delete Buttons */}
    <button onClick={() => props.handleDeleteTodo(props.id)}>Delete</button>
    <button onClick={() => props.handleMarkEdit(props.id)}>Edit</button>
  </div>
)

export default Todo