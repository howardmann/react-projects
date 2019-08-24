import React from 'react'
import Todo from './Todo'
import EditTodoForm from './EditTodoForm'
import getVisibleTodos from './reducers/getVisibleTodos'

const TodoList = (props) => {
  let visibleTodos = getVisibleTodos(props.todos, props.filter)
  return (
    <div style={{border: '1px solid green'}}>
      <i style={{color: 'green'}}>TodoList</i>
      {visibleTodos.map(t => 
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
}

export default TodoList