import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';

class Canvas extends Component {
  constructor(props){
    super(props)
    this.state = {
      coordinates: [
        {left: 10, top: 10, color: 'blue'},
        {left: 30, top: 10, color: 'red'}
      ]
    }
  }
  handleClick(e){
    let colors = ['red', 'purple', 'blue', 'orange', 'palegoldenrod', 'salmon']
    let randomColor = _.sample(colors);
    let pixel = {left: e.clientX, top: e.clientY, color: randomColor}
    this.setState(prevState => ({
      coordinates: [...prevState.coordinates, pixel]
    }))
  }
  render(){
    let pixelStyle = (left, top, color) => ({
      backgroundColor: color,
      borderRadius: '50%',
      left: `${left}px`,
      top: `${top}px`,
      position: 'absolute',
      width: '18px',
      height: '18px',
      transform: 'translate(-50%, -50%)'
    })
    let pixels = this.state.coordinates.map((pixel, i) => {
      let {left, top, color} = pixel
      return (
        <span style={pixelStyle(left, top, color)}></span>
      )
    })
    return (
      <div onClick={this.handleClick.bind(this)} style={{background: 'gainsboro', height: '1000px'}}>
        {pixels}
      </div>
    )
  }
}


const App = () => (
  <div>
    <Canvas/>
  </div>
)

export default App;
