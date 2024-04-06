import React, { useRef } from 'react'
import lang from "../utils/languageConstants"
import { useDispatch, useSelector } from 'react-redux'
import openai from '../utils/openai'
import { apiOptions } from '../utils/constants'
import {addGptMovieResult} from '../utils/gptSlice'

const GptSearchBar = () => { 


  const dispatch = useDispatch();

  // subscribe to the store to extract values
  const langKey = useSelector(store => store.language.lang)
  const searchText = useRef(null);


  const searchMovieTmdb = async (movie) => {

    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query="
    + movie +
    "&include_adult=false&language=en-US&page=1",apiOptions)

    const json = await data.json()

    return json.results;

  }


  const handleGptSearch = async ()  => {

    const query = 
    "Act as Movie Recommendation System and suggest some movies for the query"
     + searchText.current.value + 
     "only give me names seprated by comma . Example : Pathan , Holiday , Salazaar , Sholay , Don";

    const gptSearchResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content:query}],
      model: 'gpt-3.5-turbo',
    });

    if(!gptSearchResults.choices){
      console.log("Oh Oh!! No Movies Found")
    }

    // console.log(gptSearchResults.choices?.[0]?.message?.content);

    const gptMovies = gptSearchResults.choices?.[0]?.message?.content.split(",");

    // make call to TMDB

    const promiseArray = gptMovies.map(movie => searchMovieTmdb(movie))

    const tmdbResults =  await Promise.all(promiseArray);

    dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults}));

  }

  return (
    <div className='flex md:pt-[11.5%] pt-[40%] justify-center'>
        <form 
        className='w-full md:w-1/2 bg-black grid grid-cols-12 rounded-xl opacity-90'
        onSubmit={(e) => e.preventDefault()}>

            <input type='text'
            ref={searchText} 
            className='p-4 m-4 col-span-9 rounded-xl'
            placeholder={lang[langKey].gptSearchPlaceHolder} />

            <button 
            className='col-span-3 py-2 px-4 m-4 bg-red-700 text-white rounded-xl'
            onClick={handleGptSearch}
            >{lang[langKey].search}</button> 
        </form>
    </div>
  )
}

export default GptSearchBar