import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './calculator';
import CalculatorContainer from './redux-calculator';

const App = () => (
  <div>
    <h1>App</h1>
    <Calculator/>
    <hr/>
    <CalculatorContainer/>
  </div>
)

ReactDOM.render( < App /> , document.getElementById('root'));
