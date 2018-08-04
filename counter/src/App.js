import React, { Component } from 'react';
import './App.css';
import Counter from './counter/Counter.js'

class App extends Component {
  render() {
    return (
      <div className="App">          
        <h1 className="App-title">App Counter</h1>
        <Counter/>
      </div>
    );
  }
}

export default App;
