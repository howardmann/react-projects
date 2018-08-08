import React from 'react'

const MovieItem = (props) => (
  <div style={{border: "1px solid hotpink"}}>
    <img src={props.poster} width="150"/>
    <span>Title: {props.title}</span> | 
    <span>Year: {props.year}</span>
  </div>
)

export default MovieItem