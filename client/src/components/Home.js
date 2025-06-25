import React from 'react'

function Home() {
  return (
    <div className='bg-gray-600 h-screen w-screen flex flex-col items-center justify-center px-4'>
      {/* navigation buttons */}
      <div className='absolute top-4 left-4 flex flex-row space-x-4'>
        <a href="/" className='text-gray-100 underline'>home</a>
        <a href="/search" className='text-gray-100 underline'>search song</a>
      </div>

      {/* title */}
      <h1 className="absolute top-64 left-1/2 transform -translate-x-1/2 text-gray-100 text-2xl">
        abc notes
      </h1>

      {/* main page text */}
      <div className='bg-gray-700 w-full max-w-xl min-h-[120px] p-4 rounded-md text-gray-100 shadow-md flex flex-col items-center justify-center'>
        <p>
        abc notes is a simple tool that generates ABC notation musical notes from the songs you choose.
        Head to the search page to enter a song name and artist.
        If notes can't be found, it’s likely due to copyright restrictions.
        </p>
      </div>
    </div>
  )
}

export default Home