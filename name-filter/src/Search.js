import React from 'react'

const Search = (props) => (
  <input type="text" value={props.search} onChange={props.handleChange} placeholder="filter baby name"/>
)

export default Search