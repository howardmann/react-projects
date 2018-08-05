import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Calculator from './calculator';
import reducer from '../reducer'

const store = createStore(reducer)

const CalculatorContainer = () => (
  <Provider store= {store}>
    <Calculator/>
  </Provider>
)

export default CalculatorContainer
