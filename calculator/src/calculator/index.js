import React from 'react';
import reducer from '../reducer';

class Calculator extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      a: "",
      b: "",
      fn: "ADD",
      result: ""
    }
  }
  handleInputChange = (e) => {
    // Wrap in Promise to calc async
    Promise.resolve(
      this.setState({
      [e.target.name]: e.target.value
    })).then(() => {
      this.calculate()
    })
  }
  calculate = () => {
    let action = {
      type: 'CALCULATE',
      payload: {
        fn: this.state.fn,
        a: this.state.a,
        b: this.state.b
      }
    }
    this.setState(reducer(this.state, action))
  }
  reset = () => this.setState(reducer(this.state, {type: 'RESET'}))
  render(){
    return (
      <div>
        <p>Calculator - Vanilla Reducer</p>
        <p>A: {this.state.a} | B: {this.state.b} | fn: {this.state.fn}</p>
        <input type="number" name="a" value={this.state.a} onChange={this.handleInputChange}/>
        <select name="fn" onChange={this.handleInputChange}>
          <option value="ADD">+</option>
          <option value="DEDUCT">-</option>
          <option value="MULTIPLY">x</option>
          <option value="DIVIDE">/</option>
        </select>
        
        <input id="b" type="number" name="b" value={this.state.b} onChange={this.handleInputChange}/>

        <span> = </span>

        <span>{this.state.result}</span>
        
        <p>
          <button onClick={this.reset}>Reset</button>
        </p>
        
      </div>
    )
  }
}

export default Calculator