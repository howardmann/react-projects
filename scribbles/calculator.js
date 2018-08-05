import * as R from 'ramda'

let add = (a, b) => a + b
let deduct = (a, b) => a - b
let multiply = (a, b) => a * b
let divide = (a, b) => a / b

const initialState = 0

let isType = (type) => R.pipe(
  R.prop('type'),
  R.equals(type)
)

let calc = fn => action => {
  let {a,b} = action.payload
  return fn(a,b)
}

let calculator = (state = 0, action) => 
  R.cond([
    [isType('ADD'), calc(add)],
    [isType('DEDUCT'), calc(deduct)],
    [isType('MULTIPLY'), calc(multiply)],
    [isType('DIVIDE'), calc(divide)],
    [R.T, R.always(state)]
  ])(action)

calculator(initialState, {type: 'ADD', payload: {a: 1, b: 2}})
calculator(initialState, {type: 'DEDUCT', payload: {a: 1, b: 2}})
calculator(initialState, {type: 'MULTIPLY', payload: {a: 1, b: 2}})
calculator(initialState, {type: 'DIVIDE', payload: {a: 1, b: 2}})



