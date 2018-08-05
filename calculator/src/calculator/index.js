import React from 'react';
import reducer from './reducer';


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
    // setState is async and takes cb as last arg
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.calculate()
    })
  }
  calculate = () => {
    let action = {
      type: this.state.fn,
      payload: {
        a: Number(this.state.a),
        b: Number(this.state.b)
      }
    }
    let result = reducer(0, action)
    this.setState({result})
  }
  reset = () => {
    this.setState({
      a: "", b: "", fn: "ADD", result: ""
    })
  }
  render(){
    return (
      <div>
        <p>Calculator</p>
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