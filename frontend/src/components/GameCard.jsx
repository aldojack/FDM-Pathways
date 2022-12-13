import React from 'react'
import { Link } from 'react-router-dom'

export default function GameCard({AuthToken, PlaceholderImg, Name, Description}) {
  
  return (
    <div className="game sm:col-span-12 md:col-span-6 lg:col-span-4 justify-self-center">
      <div className='image relative w-full h-full'>
          <img src={PlaceholderImg} className="block h-full"/>
          <div className='image_overlay p-4 opacity-0 absolute top-0 left-0 w-full h-full bg-black/60 text-white flex flex-col items-center justify-center transition-opacity duration-75 hover:opacity-100'>
            <div className='image_title font-bold text-2xl'>{Name}</div>
            <p className='image_description text-sm mt-1'>{Description}</p>
          </div>
        </div>
        {AuthToken &&  <Link to={`/games/${Name}`} className='outline-none bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl px-4 py-1 mt-6 hover:from-purple-600 hover:to-blue-600 text-white font-bold'>Play</Link>}
    </div>
  )
}
