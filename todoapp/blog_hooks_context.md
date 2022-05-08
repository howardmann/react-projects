# Learn React - Hooks and Context

A practical tutorial of using React Hooks, Custom Hooks and Context to add a new feature *"keyboard shortcuts"* to the classic Todo App teaching exercise.

### New Feature
- **Product Brief:** Keyboard shortcut keys to change filter display of todolist results ("a" -> Show All, "d" -> Show Done, "n" -> Show Not Doing)
- **How?** Use React Custom Hooks to listen for key presses and dispatch changes to state

### Gotchas
- **Product Brief:** Disable shortcut keys when user is typing inside input text fields (e.g. when creating or editing todo names)
- **How?** Use React Context to track global state of whenever a user has focus in an input text field

[See live demo](https://mannhowietodoapp2.surge.sh/) and [previous blog](https://mannhowie.com/react-and-redux-a-visual-explanation) for a visual explanation of React.

## 1. What are Hooks
Hooks are reusuable functions for your React app when you want to share logic that fetches and updates state, listens for changes in user and window events or handles authentication. The two built-in hooks that most custom hooks will build atop are `useState` and `useEffect`.

### useState
useState built-in hook is used to read and write values to component state. It takes an initial default value and returns an array with two elements. The first is the current value of the state and the second is a state setter function that updates the current value. 

```javascript
// useState example of a simple counter component
import React from 'react'

export default function Counter() {
  let initialState = 0
  let [count, setCount] = React.useState(initialState);
  
  let handleIncrement = () => setCount(count + 1)
  
  let handleReset = () => setCount(0);
  
  return (
    <div>
      <h1>Counter</h1>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
```

### useEffect
useEffect built-in hook manages the component lifecycle and side-effects of components. It is used to fetch and update data, listen for changes to state, register and deregister event listeners and clean up components.

It takes two arguments, the first a callback function and the second an array of state values it will listen for changes before executing the callback function.

```javascript
// useEffect example to fetch and persist between UI state and localStorage
import React from 'react'

export default function Counter() {
  // initial value last saved localstorage if exists else 0
  let initialState = JSON.parse(localStorage.getItem('count') || 0)

  let [count, setCount] = React.useState(initialState);
  
  let handleIncrement = () => setCount(count + 1)
  
  let handleReset = () => setCount(0);

  // useEffect listen for changes to count and persist state change to localStorage
  React.useEffect(() => {
    localStorage.setItem('count', JSON.stringify(count))
  },[count])
  
  return (
    <div>
      <h1>Counter</h1>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
```

## 2. Our First Custom Hook
To implement our new shortcut key feature we will create two custom hooks:
1. `useKeyPress`: to register and deregister window event listeners for `keydown` and `keyup` of target keys
2. `useFilterKeyPress`: will use our useKeyPress custom hook to register specific keys and dispatch filter events to update our filter view

### useKeyPress
Our first custom hook useKeyPress takes a single argument `targetKey` (e.g. keyboard letter "a") and returns an updated useState current value (a boolean) whenever a window keydown or keyup event is triggered.

We use the built-in useState hook to keep track of whether the targetKey has been pressed `keyPressed` which returns a boolean.

Our simple handlers check whether the pressed key matches the targetKey and returns either true or false.

We use the built-in useEffect hook to to register our window event listeners for the keydown and keyup events and register our handler callbacks. We also tidy up our event listeners by returning a function which removes the event listeners upon component tear down.

```javascript
// hooks/useKeyPress.js
import  React  from 'react';

export const useKeyPress = (targetKey) => {  
  const [keyPressed, setPressedKey] = React.useState(false)

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

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return keyPressed
}
```
### useFilterKeyPress
Our second custom hook useFilterKeyPress will use our previous custom hook `useKeyPress` to listen for key presses and will then dispatch events to update our parent component state. It takes a dispatch function as an argument from the parent app to dispatch changes to our parent reducer.

We first register our shortcut key presses ("a", "d", "n"). This will return a state boolean for each value and will update whenever a keydown or keyup event is triggered.

We use the useEffect hook to dispatch the relevant filter actions based on which key is pressed. It takes an array of values `[pressA, pressD, pressN]` which will trigger the functions inside the hook whenever those values change.

```javascript
// hooks/useFilterKeyPress.js

import React from 'react'
import {useKeyPress} from './useKeyPress'

export const useFilterKeyPress = (dispatch) => {
  const pressA = useKeyPress("a")
  const pressD = useKeyPress('d')
  const pressN = useKeyPress('n')

  // useEffect hook detect changes when input not in focus in keys above, if true dispatch filter change
  React.useEffect(() => {
    if (pressA) {
      dispatch({type: 'SHOW_ALL'})
    }
    if (pressD) {
      dispatch({type: 'SHOW_DONE'})
    }
    if (pressN) {
      dispatch({type:'SHOW_NOT_DONE'})
    }
  },[pressA, pressD, pressN])
}
```

## 3. React Context API
The React Context API allows us to share global state amongst parent and children components without passing them through intermediaries (known as prop drilling).

In our product brief we are made aware of a gotcha with our shortcut keys. We need to disable the shortcut keys if a user is entering text inside an input text field. This is to prevent the user from unintentionally triggering the filter updates when simply entering text.

As our application scales there is likely to be future input text fields which may be nested deeply as children components.

This is a great use case of the React Context API for us to keep track of whenever a user has `focus` inside an input text field.

### Create our new context
First we create our context object which we will import across parent and children components. We will use this context as a way to track global state of whether an input text field is in focus or not.
```javascript
//context/contextInput.js
import React from 'react'

const ContextInput = React.createContext()

export default ContextInput
```

### Update useFilterKeyPress
Next we must update our custom hook `useFilterKeyPress` to not trigger the filter actions if an input text field is in focus.

We create a new boolean state `isInputFocused` and a setter `setIsInputFocused` which will be based on our `ContextInput` to track whether an input text field is in focus.

We udate our useEffect code to ensure the actions are only dispatched if input is not in focus. And we return the value of `[isInputFocused, setIsInputFocused]` to allow the state to be read and updated. 

```javascript
// hooks/useFilterKeyPress.js

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
```
### Use context and custom hook in our main App
We first use our custom hook `useFilterKeyPress` which returns a value and setter to determine whether any input field is in focus. We pass it our dispatch handler which will allow the hook to update the App's parent state to change filter display options.
```javascript
  import {useFilterKeyPress} from '../hooks/useFilterKeyPress'
  // Custom hook to filter shortcut keypress
  const [isInputFocused, setIsInputFocused] = useFilterKeyPress(dispatch)
```
We then use our `ContextInput` and apply its Provider model which wraps it as a parent component and gives all children component within it access to its context values. We pass it a value property being our state values and setters `isInputFocused` and `setIsInputFocused` which will allow children components to update the state.

The two children components that will use it now include the `<NewTodoForm>` and the `<EditTodoForm>` which is a deeply nested child of the `<TodoList>`. This is the primary benefit of using React Context API, we no longer have to pass handler functions to multiple intermediaries which exposes us to code duplication and error.

```javascript
import {useFilterKeyPress} from '../hooks/useFilterKeyPress'
import ContextInput from '../context/contextInput'

const [isInputFocused, setIsInputFocused] = useFilterKeyPress(dispatch)
return (
    <div>
      <h1>TODOAPP</h1>

      {/* Using React Context for sharing global isInputFocused variable to detect if any text input is focus */}
      <ContextInput.Provider value={[isInputFocused, setIsInputFocused]}>
        <NewTodoForm handleNewTodo={handleNewTodo} />

        <Filter filter={filter} handleFilter={handleFilter}/>

        <TodoList 
          todos={todos}
          editing={editing}
          handleMarkDone={handleMarkDone}
          handleMarkEdit={handleMarkEdit}
          handleDeleteTodo={handleDeleteTodo}
          handleEditTodo={handleEditTodo}
          handleMarkEditUndo={handleMarkEditUndo}
          filter={filter}
        />
        
      </ContextInput.Provider>
    </div>
```


Final App.js altogether
```javascript
//src/components/App.js

import React from 'react';
import {useLocalStorage} from '../hooks/useLocalStorage'
import {useFilterKeyPress} from '../hooks/useFilterKeyPress'
import ContextInput from '../context/contextInput'

import reducer from '../reducers/index'
import NewTodoForm from './NewTodoForm'
import TodoList from './TodoList'
import Filter from './Filter'

function App() {
  let initialState = reducer(undefined, {})
  
  // custom hook useLocalStorage
  const [state, setState] = useLocalStorage(initialState, 'state')
  
  // reducer implementation of dispatch
  const dispatch = (action) => {
    setState(prevState => reducer(prevState, action))
  }
  
  // State handlers
  let handleMarkDone = (id) => {
    dispatch({type: 'MARK_DONE_TODO', id})
  }
  let handleMarkEdit = (id) => {
    dispatch({type: 'MARK_EDIT_TODO', id})
  }
  let handleMarkEditUndo = (id) => {
    dispatch({type: 'MARK_EDIT_UNDO_TODO', id})
  }
  let handleNewTodo = (content) => {
    dispatch({type: 'ADD_TODO', content})
    dispatch({type: 'SHOW_ALL'})
  }
  let handleEditTodo = ({id, content, done}) => {
    dispatch({type: 'EDIT_TODO', id, content, done})
  }
  let handleDeleteTodo = (id) => {
    dispatch({type: 'DELETE_TODO', id})
  }
  let handleFilter = (e) => {
    let filter = e.target.value 
    dispatch({type: filter})
  }

  // State values from reducers
  let {todo, visibility} = state
  let {todos, editing} = todo
  let {filter} = visibility

  // Custom hook to filter shortcut keypress
  const [isInputFocused, setIsInputFocused] = useFilterKeyPress(dispatch)

  return (
    <div>
      <h1>TODOAPP</h1>

      {/* Using React Context for sharing global isInputFocused variable to detect if any text input is focus */}
      <ContextInput.Provider value={[isInputFocused, setIsInputFocused]}>
        <NewTodoForm handleNewTodo={handleNewTodo} />

        <Filter filter={filter} handleFilter={handleFilter}/>

        <TodoList 
          todos={todos}
          editing={editing}
          handleMarkDone={handleMarkDone}
          handleMarkEdit={handleMarkEdit}
          handleDeleteTodo={handleDeleteTodo}
          handleEditTodo={handleEditTodo}
          handleMarkEditUndo={handleMarkEditUndo}
          filter={filter}
        />
        
      </ContextInput.Provider>
    </div>
  );
  
}

export default App;

```

### Use and update context
Finally with our children components we can now access our `ContextInput` and update its state based on whether an input field is in `focus` or not.

To do this we import the context and use React's context hook `useContext` which takes the `ContextInput` object as an argument and returns the values of the parent Provider, in this case our setter function `setIsInputFocused`. In our example we don't require the current value as we are only interested in updating the value.

Then we add two event callback functions on our input text field `onFocus` and `onBlur` to update our `IsInputFocused`value. We set it as true when `onFocus` and  false when `onBlur` to reset it.

As this value is now shared inside the global `ContextInput` object, the parent App component can now access the latest value of `IsInputFocused` and not trigger any filter actions if this value is true.

```javascript
// src/components/NewTodoForm.js
import React from 'react'
import ContextInput from '../context/contextInput'

const NewTodoForm = (props) => {
  const [content, setContent] = React.useState('')
  const [,setIsInputFocused] = React.useContext(ContextInput)

  let handleChange = (e) => {
    setContent(e.target.value)
  }
  let handleSubmit = (e) => {
    e.preventDefault()
    if (content.trim() === '') return
    props.handleNewTodo(content)
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} style={{border: '1px solid rebeccapurple'}}>
      <p><i style={{color: 'rebeccapurple'}}>NewTodoForm</i></p>
      <input type="text" name="content" value={content} onChange={handleChange} placeholder="Add new todo" onBlur={() => setIsInputFocused(false)} onFocus={() => setIsInputFocused(true)}/>
    </form>
  )
}

export default NewTodoForm
```

Similarly we follow the same pattern for the `EditTodoForm` which is nested multiple levels deep within `TodoList` component without needing to prop drill across multiple components.
```javascript
// src/components/EditTodoForm
import React from 'react'
import ContextInput from '../context/contextInput'

const EditTodoForm = (props) => {
  const [content, setContent] = React.useState(props.content)
  const [done, setDone] = React.useState(props.done)
  // ContextAPI
  const [,setIsInputFocused] = React.useContext(ContextInput)

  let handleChange = (e) => {
    setContent(e.target.value)
  }
  let handleChecked = (e) => {
    setDone(!done)
  }
  let handleSubmit = (e) => {
    e.preventDefault()

    props.handleEditTodo({
      id: props.id,
      content: content,
      done: done
    })
  }
  return (
    <div style={{border: '1px solid blue'}}>
      <i style={{color: 'blue'}}>EditTodoForm</i>
      <form onSubmit={handleSubmit}>
        <input type="text" name="content" value={content} onChange={handleChange} onBlur={() => setIsInputFocused(false)} onFocus={() => setIsInputFocused(true)} />
        <input type="checkbox" name="done" checked={done} onChange={handleChecked}/>
        <input type="submit" value="Update"/>
      </form>
      <button onClick={() => props.handleMarkEditUndo(props.id)}>Undo Edit</button>
    </div>

  )
}

export default EditTodoForm
```

[Click here to see the full github repo](https://github.com/howardmann/react-projects/tree/master/todoapp)