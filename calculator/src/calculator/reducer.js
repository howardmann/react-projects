import * as R from 'ramda'

let add = (a, b) => Number(a) + Number(b)
let deduct = (a, b) => Number(a) - Number(b)
let multiply = (a, b) => Number(a) * Number(b)
let divide = (a, b) => Number(a) / Number(b)

let isType = (type) => R.pipe(
  R.prop('type'),
  R.equals(type)
)

let calc = fn => action => {
  let {a,b} = action.payload
  return fn(a,b)
}

let reducer = (state = 0, action) => 
  R.cond([
    [isType('ADD'), calc(add)],
    [isType('DEDUCT'), calc(deduct)],
    [isType('MULTIPLY'), calc(multiply)],
    [isType('DIVIDE'), calc(divide)],
    [R.T, R.always(state)]
  ])(action)

export default reducer