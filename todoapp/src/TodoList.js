import React from 'react'
import Todo from './Todo'
import EditTodoForm from './EditTodoForm'

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

export default TodoList