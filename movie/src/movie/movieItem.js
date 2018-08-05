import React from 'react'

class MovieItem extends React.Component{
  render(){
    return (
      <div style={{border: "1px solid hotpink"}}>
        <img src={this.props.poster} width="150"/>
        <span>Title: {this.props.title}</span> | 
        <span>Year: {this.props.year}</span>

      </div>
    )
  }
}

export default MovieItem