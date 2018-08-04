import React, { Component } from 'react';
import CounterReducer from './CounterReducer.js';

class Counter extends Component {
  constructor(props){
    super(props)
    this.state = {
      number: 0
    }
  }
  dispatchNumber(action){
    let number = CounterReducer(this.state.number, action)
    this.setState({number})
  }
  decrement(){
    this.dispatchNumber({type:'DECREMENT'})
  }
  increment(){
    this.dispatchNumber({type:'INCREMENT'})
  }
  double(){
    this.dispatchNumber({type:'DOUBLE'})
  }
  reset(){
    this.dispatchNumber({type:'RESET'})
  }
  render(){
    return (
     <div className="Counter">
      <button className="reset" onClick={this.reset.bind(this)}> ! </button>
      <button className="decrement" onClick={this.decrement.bind(this)}> - </button>
      
      <span className="number">{this.state.number}</span>
      
      <button className="increment" onClick={this.increment.bind(this)}> + </button>
      <button className="double" onClick={this.double.bind(this)}> x2 </button>
     </div>
    )
  }
}

export default Counter