import React from 'react';

class Input extends React.Component {
  render(){
    return(
      <span>
        <input type="number" name={this.props.name} value={this.props.value} onChange={this.props.handleInputChange}/>      
      </span>
    )
  }
}

export default Input