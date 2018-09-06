import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';

const Pixel = (props) => {
  let {left, top, color} = props.pixel
  let pixelStyle = {
    backgroundColor: color,
    borderRadius: '50%',
    left: `${left}px`,
    top: `${top}px`,
    position: 'absolute',
    width: '18px',
    height: '18px',
    transform: 'translate(-50%, -50%)'
  }
  return (
    <span style={pixelStyle}></span>
  )
}

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
  getColor(){
    return _.sample(['red', 'purple', 'blue', 'orange', 'palegoldenrod', 'salmon']);
  }
  handleClick = (e) => {
    let pixel = {left: e.clientX, top: e.clientY, color: this.getColor()}
    this.setState(prevState => ({
      coordinates: [...prevState.coordinates, pixel]
    }))
  }
  render(){
    let pixels = this.state.coordinates.map(pixel => <Pixel pixel={pixel}/>)
    return (
      <div onClick={this.handleClick} style={{background: 'gainsboro', height: '1000px'}}>
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
