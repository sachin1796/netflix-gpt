import { apiOptions } from '../utils/constants'
import { useDispatch } from 'react-redux'
import {addPopularMovies} from "../utils/movieSlice"
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const usePopularMovies = () => {

  const dispatch = useDispatch();

  const popularMovies = useSelector(store => store.movies.PopularMovies)

  const getPopularMovies = async () => {

    const data = await fetch(
      'https://api.themoviedb.org/3/movie/popular?page=1',
      apiOptions
    );

    const json = await data.json();
    


    dispatch(addPopularMovies(json.results))
    
  }

  useEffect(()=> {
    if(!popularMovies) getPopularMovies();

  },[])
}

export default usePopularMovies;