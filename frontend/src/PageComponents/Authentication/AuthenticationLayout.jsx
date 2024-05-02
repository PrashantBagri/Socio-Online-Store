import React from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'

function AuthenticationLayout() {
  return (
    <div>
        <div className='border-b-2 border-black '>
            <Link to="/">
            <img className='md:w-[10%]  mx-auto py-6' src="Socio.svg" alt="" />
            </Link>
        </div>
        <Outlet/>
    </div>
  )
}

export default AuthenticationLayout