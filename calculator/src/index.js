import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './calculator';
import CalculatorContainer from './redux-calculator';
import Calculator2 from './calculator2';

const App = () => (
  <div>
    <h1>App</h1>
    <Calculator/>
    <hr/>
    <CalculatorContainer/>
    <hr/>
    <Calculator2/>    
  </div>
)

ReactDOM.render( < App /> , document.getElementById('root'));
