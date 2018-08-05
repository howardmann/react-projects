import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './calculator';

const App = () => (
  <div>
    <h1>App</h1>
    <Calculator/>
  </div>
)

ReactDOM.render( < App /> , document.getElementById('root'));
