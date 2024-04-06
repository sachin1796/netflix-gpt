import React from 'react'
import MovieList from './MovieList'
import { useSelector } from "react-redux"

const SecondaryContainer = () => {


  // going to store > subscribing to movies
  const movies = useSelector((store)=> store.movies)
  return (
    <div className='bg-black'>
      <div className=" mt-0 md:-mt-52 relative z-20">
      <MovieList   title={"Now Playing"} movies={movies.nowPlayingMovies} />
      <MovieList title={"Popular"} movies={movies.PopularMovies} />
      <MovieList title={"Upcoming"} movies={movies.UpcomingMovies} />
      <MovieList title={"Top Rated"} movies={movies.nowPlayingMovies} />
      </div>



    {/* 

      MovieList - 
        popular
        Now Playing
        Movie List
        Trending
        Horror


        >> each will have n cards
        >> horizzontal rows
    
  
  
  */}
  </div>
    
  )
}

export default SecondaryContainer