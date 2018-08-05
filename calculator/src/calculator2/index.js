import React from 'react';
import reducer from '../reducer';
import Input from './input';
import Select from './select';


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
        <p>Calculator - With Children</p>
        <p>A: {this.state.a} | B: {this.state.b} | fn: {this.state.fn}</p>
        
        <Input name="a" value={this.state.a} handleInputChange={this.handleInputChange}/>
        
        <Select handleInputChange={this.handleInputChange}/>
        
        <Input name="b" value={this.state.b} handleInputChange={this.handleInputChange}/>

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