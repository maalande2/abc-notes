import React, { useState } from 'react'
import Profile from './Profile'

function NavigationButtons() {
  const [openProfile, setOpenProfile] = useState(false);

  return (
  <div>
    <div className='text-gray-100 underline absolute top-4 left-8 right-8 flex justify-between space-x-4'>
      {/* buttons */}
      <div className='flex space-x-4'>
        <a href="/" className=''>home</a>
        <a href="/search" className=''>search song</a>
      </div>
      {/* profile icon */}
      <button onClick={() => setOpenProfile((prev) => (!prev))} className='ml-auto'>
        <img className='w-8 h-8 rounded-full object-cover'
          src='/profile.png'
          alt='profile'
        />
      </button>
    </div>
    
    {/* profile w/ toggle*/}
    {openProfile && <Profile/>}
    
  </div>

  )
}

export default NavigationButtons