import React from 'react'
import MovieItem from './movieItem'

const MovieList = (props) => (
  <div style={{border: '1px solid blue'}}>
    <h2>Movie List</h2>
    {props.movies.map((d, i) => <MovieItem key={i} title={d.Title} year={d.Year} poster={d.Poster}/>)}
  </div>
)

export default MovieList