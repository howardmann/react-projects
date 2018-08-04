import * as R from 'ramda';

let CounterReducer = (state = 0, action) =>
  R.cond([
    [R.equals('INCREMENT'), () => state + 1],
    [R.equals('DECREMENT'), () => state - 1],
    [R.equals('DOUBLE'), () => state * 2],
    [R.equals('RESET'), () => 0],
    [R.T, R.always(state)]
  ])(action.type)

export default CounterReducer