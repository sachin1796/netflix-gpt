import React, { useEffect } from 'react'
import {apiOptions} from "../utils/constants"
import { useDispatch, useSelector } from 'react-redux'
import { addTrailerVideo } from '../utils/movieSlice'

const useMovieTrailer = (movie_id) => {

    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

    const dispatch = useDispatch();

    // fetch trailer > api call > dipatch an action to the store to update the movieTrailer

    const getVideo = async () => {


      const data = await fetch(
        "https://api.themoviedb.org/3/movie/"
        +movie_id+
        "/videos?language=en-US",apiOptions)

      const json = await data.json();
      const filterVideos = json.results.filter(video => video.type === "Trailer")
      const trailer = filterVideos.length ? filterVideos[0] : json.results[0];
      dispatch(addTrailerVideo(trailer));
     
  }

 
  useEffect(() => {
    if(!trailerVideo) getVideo();
  },[])


}
export default useMovieTrailer;