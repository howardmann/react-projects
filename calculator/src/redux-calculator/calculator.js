import React from 'react';
import {connect} from 'react-redux';

class Calculator extends React.Component {
  handleInputChange = (e) => {
    // Wrap in promise to call async
    Promise.resolve(
      this.props.dispatch({type: 'UPDATE', payload: {
        [e.target.name]: [e.target.value]
      }})
    ).then(() => {
      this.calculate()
    })
  }
  calculate = () => {
    this.props.dispatch({type: 'CALCULATE', payload:{
      fn: this.props.fn,
      a: this.props.a,
      b: this.props.b
    }})
  }
  reset = () => this.props.dispatch({type: 'RESET'})
  render(){
    return (
      <div>
        <p>Calculator - Redux</p>
        <p>A: {this.props.a} | B: {this.props.b} | fn: {this.props.fn}</p>
        <input type="number" name="a" value={this.props.a} onChange={this.handleInputChange}/>
        <select name="fn" onChange={this.handleInputChange}>
          <option value="ADD">+</option>
          <option value="DEDUCT">-</option>
          <option value="MULTIPLY">x</option>
          <option value="DIVIDE">/</option>
        </select>
        
        <input id="b" type="number" name="b" value={this.props.b} onChange={this.handleInputChange}/>

        <span> = </span>

        <span>{this.props.result}</span>
        
        <p>
          <button onClick={this.reset}>Reset</button>
        </p>
        
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    a: state.a,
    b: state.b,
    fn: state.fn,
    result: state.result
  }
}

export default connect(mapStateToProps)(Calculator)