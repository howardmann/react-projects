let initialState = {
  filter: 'SHOW_ALL'
}
const VisibilityReducer = (state = initialState, action) => {
  if (action.type === 'SHOW_ALL') {
    return {filter: 'SHOW_ALL'}
  }
  if (action.type === 'SHOW_DONE') {
    return {filter: 'SHOW_DONE'}
  }
  if (action.type === 'SHOW_NOT_DONE') {
    return {filter: 'SHOW_NOT_DONE'}
  }
  return state
}

module.exports = VisibilityReducer