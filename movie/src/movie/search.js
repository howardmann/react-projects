import React from 'react'

const Search = (props) => (
  <form>
    <input name="search" type="text" onSubmit={props.search} placeholder="search title" onChange={props.handleInputChange}/>
    <button onClick={props.search}>Search</button>
  </form>
)

export default Search