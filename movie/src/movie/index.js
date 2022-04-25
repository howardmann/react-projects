import React, {useState, useEffect} from 'react'
import seedMovies from '../data/movies.json' // dummy data for initial State
import Search from './search'
import MovieList from './movieList'

function Movie() {
  let initialState = seedMovies
  let [data, setData] = useState(initialState)
  let [inputValue, setInputValue] = useState("Alien")

  let fetchMovie = async (search) => {
    await fetch(`http://www.omdbapi.com/?apikey=ee0200e&s=${search}`)
      .then(resp => resp.json())
      .then(resp => {
        let data = resp.Search
        setData(data)
      })
  }

  // fetch new omdb data on load based on search term
  useEffect(() => {
    fetchMovie(inputValue)
  },[])
  
  
  let handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  let searchMovie = (e) => {
    e.preventDefault()    
    fetchMovie(inputValue)
  }

  return (
    <div style={{border: '1px solid chartreuse'}}>
      <h2>Movie App</h2>
      <p>Search for: {inputValue}</p>
      <Search handleInputChange={handleInputChange} search={searchMovie}/>
      <MovieList movies={data}/>
    </div>
  );
}

export default Movie;