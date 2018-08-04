import React, { Component } from 'react';
import Reducer from '../reducer';

class Counter extends Component {
  constructor(props){
    super(props)
    this.state = {
      number: 0
    }
  }
  dispatch(action){
    let newState = Reducer(this.state, action)
    this.setState(newState)
  }
  decrement = () => this.dispatch({type:'DECREMENT'})
  increment = () => this.dispatch({type:'INCREMENT'})
  double = () => this.dispatch({type:'DOUBLE'})
  random = () => this.dispatch({type:'RANDOM'})
  reset = () => this.dispatch({type:'RESET'})

  render(){
    return (
     <div>
      <p>Counter with Vanilla Reducer</p>
      <button onClick={this.random}> ? </button>
      <button onClick={this.decrement}> - </button>
      
      <span>{this.state.number}</span>
      
      <button onClick={this.increment}> + </button>
      <button onClick={this.double}> x2 </button>
      <br/>
      <button onClick={this.reset}> Reset </button>
     </div>
    )
  }
}

export default Counter