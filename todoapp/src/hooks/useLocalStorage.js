import { useState, useEffect } from 'react';

export const useLocalStorage = (initialState, key) => {  
  const item = JSON.parse(localStorage.getItem(key))
  // use localStorage if exists otherwise use initialState param
  let initialStateValue = item ? item : initialState

  const [state, setState] = useState(initialStateValue)

  // return a wrapped version of useState's setter function
  const setValue = value => {
    setState(value)
  }

  // udpdate localstorage whenever state is changed
  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state))
  },[state])


  return [state, setValue]
}
