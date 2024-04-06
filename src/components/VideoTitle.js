import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div 
    
    className='w-full aspect-video pt-[20%] px-10 absolute bg-gradient-to-r from-black'
    >
      <h1 className='font-bold text-lg md:text-3xl w-1/2 text-white'>{title}</h1>
      <p className='hidden md:inline-block font-semibold py-4 w-1/3  text-white'>{overview}</p>
     <div className="">
      <button className='font-semibold  text-white bg-red-600 p-3 px-8 rounded-lg mr-2 mt-2 hover:bg-opacity-85'
      >  Play</button>
      <button className='hidden md:inline-block font-semibold  text-black bg-slate-300 p-3 rounded-lg mt-2 hover:bg-opacity-85'>More Info</button>
     </div>
    </div>
  )
}

export default VideoTitle