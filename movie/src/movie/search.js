import React from 'react'

class Search extends React.Component{
  render(){
    return (
      <form>
        <input name="search" type="text" onSubmit={this.props.search} placeholder="search title" onChange={this.props.handleInputChange}/>
        <button onClick={this.props.search}>Search</button>
      </form>
    )
  }
}

export default Search