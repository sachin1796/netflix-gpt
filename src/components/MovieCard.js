import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({posterPath}) => {
  if(!posterPath) return null;
  return (
    <div className='w-40 md:w-44'>
        <img
        className='rounded-lg'
        alt="movie Card"
        src={IMG_CDN_URL+posterPath}></img>
    </div>
  )
}

export default MovieCard