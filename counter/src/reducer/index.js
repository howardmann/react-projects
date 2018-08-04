import * as R from 'ramda';

const initialState = {
  number: 0
}

let Reducer = (state = initialState, action) =>
  R.cond([
    [R.equals('INCREMENT'), () => ({...state, number: state.number + 1})],
    [R.equals('DECREMENT'), () => ({...state, number: state.number - 1})],
    [R.equals('DOUBLE'), () => ({...state, number: state.number * 2})],
    [R.equals('RANDOM'), () => ({...state, number: Math.floor(Math.random()*100)})],
    [R.equals('RESET'), () => ({...state, number: 0})],
    [R.T, R.always(state)]
  ])(action.type)

export default Reducer