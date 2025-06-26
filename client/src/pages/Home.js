import React from 'react'
import PageTitle from '../components/PageTitle'
import NavigationButtons from '../components/NavigationButtons'

function Home() {
  return (
    <div className='bg-gray-600 h-screen w-screen flex flex-col items-center justify-center px-4'>
      {/* navigation buttons */}
      <NavigationButtons/>

      {/* title */}
      <PageTitle/>

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