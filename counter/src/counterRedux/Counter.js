import React, { Component } from 'react';
import {connect} from 'react-redux';

class Counter extends Component {
  decrement = () => this.props.dispatch({type:'DECREMENT'})
  increment = () => this.props.dispatch({type:'INCREMENT'})
  double = () => this.props.dispatch({type:'DOUBLE'})
  random = () => this.props.dispatch({type:'RANDOM'})
  reset = () => this.props.dispatch({type:'RESET'})

  render(){
    return (
     <div>
      <p>Counter with Redux</p>
      <button onClick={this.random}> ? </button>
      <button onClick={this.decrement}> - </button>
      
      <span>{this.props.number}</span>
      
      <button onClick={this.increment}> + </button>
      <button onClick={this.double}> x2 </button>
      <br/>
      <button onClick={this.reset}> Reset </button>
     </div>
    )
  }
}

function mapStateToProps(state){
  return {
    number: state.number
  }
}

export default connect(mapStateToProps)(Counter)