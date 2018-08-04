import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Counter from './Counter';
import Reducer from '../reducer'

const store = createStore(Reducer);

const App = () => (
  <Provider store={store}>
    <Counter/>
  </Provider>
)

export default App;
