import { useState, useEffect } from 'react';

export const useKeyPress = (targetKey) => {  
  const [keyPressed, setPressedKey] = useState(false)

  let handleKeyDown = (e) => {    
    if (e.key === targetKey) {
      setPressedKey(true)
    }
  }

  let handleKeyUp = (e) => {
    if (e.key === targetKey) {
      setPressedKey(false)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return keyPressed
}
