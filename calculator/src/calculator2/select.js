import React from 'react';

class Select extends React.Component {
  render(){
    return(
      <select name="fn" onChange={this.props.handleInputChange}>
        <option value="ADD">+</option>
        <option value="DEDUCT">-</option>
        <option value="MULTIPLY">x</option>
        <option value="DIVIDE">/</option>
      </select>
    )
  }
}

export default Select