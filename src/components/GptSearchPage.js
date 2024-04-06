import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import {  netflixBackground } from '../utils/constants'

const GptSearchPage = () => {
  return (
    <>
      <div className='fixed -z-10 '>
        <img className='h-screen object-cover md:h-auto'  src={netflixBackground} alt="logo" />
      </div>
      <div>
        <GptSearchBar />
        <GptMovieSuggestions />
    </div>
    </>
    
  )
}

export default GptSearchPage