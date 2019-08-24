const getVisibleTodos = (todos, filter) => {
  if (filter === 'SHOW_ALL') {
    return todos
  }
  if (filter === 'SHOW_DONE') {
    return todos.filter(t => t.done)
  }
  if (filter === 'SHOW_NOT_DONE') {
    return todos.filter(t => !t.done)
  }
  return todos
}

export default getVisibleTodos