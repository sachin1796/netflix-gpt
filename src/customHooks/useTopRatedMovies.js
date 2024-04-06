import { apiOptions } from '../utils/constants'
import { useDispatch,useSelector } from 'react-redux'
import { addTopRatedMovies} from "../utils/movieSlice"
import { useEffect } from 'react'


const useTopRatedMovies = () => {

  const dispatch = useDispatch();
  const topRatedMovies = useSelector(store => store.movies.TopRatedMovies)

  const getTopRatedMovies = async () => {

    const data = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
      apiOptions
    );

    const json = await data.json();
    


    dispatch(addTopRatedMovies(json.results))
    
  }

  useEffect(()=> {
   if(!topRatedMovies) getTopRatedMovies();

  },[])
}

export default useTopRatedMovies;