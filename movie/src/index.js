import React from 'react';
import ReactDOM from 'react-dom';
import Movie from './movie'

const App = () => (
  <div>
    <Movie/>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'));
