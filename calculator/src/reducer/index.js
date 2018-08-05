import * as R from 'ramda'

const initialState = {
  a: "",
  b: "",
  fn: "ADD",
  result: ""
}

let add = (a, b) => Number(a) + Number(b)
let deduct = (a, b) => Number(a) - Number(b)
let multiply = (a, b) => Number(a) * Number(b)
let divide = (a, b) => Number(a) / Number(b)

let isType = (type) => R.pipe(
  R.prop('type'),
  R.equals(type)
)

let calc = fn => R.pipe(
  R.prop('payload'),
  R.pick(['a', 'b']),
  ({a,b}) => fn(a,b)
)

let updateStateResult = state => 
  fn => 
    action => ({...state, result: fn(action)})

let handleKeyChange = state => action => {
  let key = Object.keys(action.payload)[0]
  let value = action.payload[key][0]
  return {...state, [key]: value }
}

let handleCalculate = state => action => {
  let {fn, a, b} = action.payload
  let newAction = {
    type: fn,
    payload: {
      a, b
    }
  }
  return reducer(state, newAction)
}


let reducer = (state = initialState, action) => {
  let updateResult = updateStateResult(state)
  return R.cond([
    [isType('ADD'), updateResult(calc(add))],
    [isType('DEDUCT'), updateResult(calc(deduct))],
    [isType('MULTIPLY'), updateResult(calc(multiply))],
    [isType('DIVIDE'), updateResult(calc(divide))],
    [isType('UPDATE'), handleKeyChange(state)],
    [isType('RESET'), () =>  initialState],
    [isType('CALCULATE'), handleCalculate(state)], // bit of recursion here
    [R.T, R.always(state)]
  ])(action)
}

export default reducer