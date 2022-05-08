import React from 'react'
import {useKeyPress} from './useKeyPress'

export const useFilterKeyPress = (dispatch) => {
  const pressA = useKeyPress("a")
  const pressD = useKeyPress('d')
  const pressN = useKeyPress('n')
  // global state to detect if text input is in focus
  // within input we will set as true if input onFocus and false when input onBlur (e.g. toggles when input out of focus)
  const [isInputFocused, setIsInputFocused] = React.useState(false)

  // useEffect hook detect changes when input not in focus in keys above, if true dispatch filter change
  React.useEffect(() => {
    if (!isInputFocused) {
      if (pressA) {
        dispatch({type: 'SHOW_ALL'})
      }
      if (pressD) {
        dispatch({type: 'SHOW_DONE'})
      }
      if (pressN) {
        dispatch({type:'SHOW_NOT_DONE'})
      }
    }
  },[pressA, pressD, pressN, isInputFocused])

  return [isInputFocused, setIsInputFocused]
}