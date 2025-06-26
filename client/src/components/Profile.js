import React from 'react'

function Profile() {
  return (
    <div>
        {/* options */}
        <div className='flex flex-col absolute top-16 right-8 z-20 text-gray-100 bg-gray-700 rounded-md shadow-md p-4 gap-2'>

                <a href='/login'>saved music</a>
                <a href='/login'>log out</a>
                <a href='/login'>log in</a>
                <a href='/login'>sign up</a>

        </div>
        {/* square arrow */}
        <div className='h-6 w-6 bg-gray-700 rotate-45 rounded-md absolute top-14 right-9 z-10'/>
    </div>
  )
}

export default Profile