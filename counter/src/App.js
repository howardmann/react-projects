import React, { Component } from 'react';
import Counter from './counter/Counter.js';
import ReduxCounter from './counterRedux/App'

class App extends Component {
  render() {
    return (
      <div className="App">          
        <h1 className="App-title">App Counter</h1>
        <Counter/>
        <ReduxCounter/>
      </div>
    );
  }
}

export default App;
