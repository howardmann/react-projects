import React from 'react'
import MovieItem from './movieItem'

class MovieList extends React.Component{
  render(){
    return (
      <div style={{border: '1px solid blue'}}>
        <h2>Movie List</h2>
        {this.props.movies.map((d, i) => <MovieItem key={i} title={d.Title} year={d.Year} poster={d.Poster}/>)}
      </div>
    )
  }
}

export default MovieList