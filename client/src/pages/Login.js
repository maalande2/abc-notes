import React from 'react'
import NavigationButtons from '../components/NavigationButtons'
import PageTitle from '../components/PageTitle'
import Profile from '../components/Profile'

function Login() {


  return (
    <div className="bg-gray-600 h-screen w-screen flex flex-col items-center justify-center ">
    
    {/* navigation buttons */}
    <NavigationButtons/>

    {/* page title */}
    <PageTitle/>

    {/* login form */}

    <form className='bg-gray-700 flex flex-col gap-y-10 text-gray-100 w-1/4 h-1/3 p-6 rounded-md'>
        <p className='text-xl text-center'>log in</p>
        <input
        className='bg-gray-300 rounded-md p-2 text-gray-800'
        placeholder='enter username'
        />
        <input
        className='bg-gray-300 rounded-md p-2 text-gray-800'
        placeholder='enter password'
        />

        <div className='flex flex-row gap-x-6 items-center justify-center'>
            <button
            type="submit"
            className="bg-gray-300 text-gray-800 rounded-md p-2"
            >
            Login
            </button>
            <p>don't have an account? <a href='/signup' className='underline'>sign up</a></p>
        </div>
    </form>
    </div>
  )
}

export default Login