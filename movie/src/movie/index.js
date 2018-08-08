import React from 'react'
import data from '../data/movies.json' // dummy data for initial State
import Search from './search'
import MovieList from './movieList'
import makeHandleInputChange from '../util/handleInputChange'

class Movie extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data,
      search: ""
    }
  }
  handleInputChange = makeHandleInputChange(this)
  fetchMovie = (search) => {
    fetch(`http://www.omdbapi.com/?apikey=ee0200e&s=${search}`)
      .then(resp => resp.json())
      .then(resp => {
        let data = resp.Search
        this.setState({data})
      })
  }
  search = (e) => {
    e.preventDefault()
    this.fetchMovie(this.state.search)
  }
  render(){
    return (
      <div style={{border: '1px solid chartreuse'}}>
        <h2>Movie App</h2>
        <p>Search for: {this.state.search}</p>
        <Search handleInputChange={this.handleInputChange} search={this.search}/>
        <MovieList movies={this.state.data}/>
      </div>
    )
  }
}

export default Movie