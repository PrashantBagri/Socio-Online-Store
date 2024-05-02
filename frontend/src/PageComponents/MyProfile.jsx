import React from 'react'
import useAuth from '../hooks/useAuth'
import MyProducts from './MyProducts';
import { Link } from 'react-router-dom';

function MyProfile() {
  const {auth} = useAuth();
    console.log(auth)
  const joinedAt = new Date("2024-04-28T08:39:34.007Z").toLocaleDateString()
  return (
        <div className=' w-fit h-screen mx-auto font-spartan'>
            <div className='flex gap-16 items-center  w-fit mx-auto'>
                <div className='h-[20vh] w-[20vh] rounded-full overflow-clip'>
                    <img src={auth?.user?.avatar} alt="" className='h-full w-full object-cover'/>
                </div>
                <div>
                    <p className='text-3xl font-semibold mt-4'>{auth?.user?.fullName}</p>
                    <p className='text-xl font-regular '>@{auth?.user?.username}</p>
                    <p className='text-sm'>Joined at {joinedAt}</p>
                </div>
                <div className='flex flex-col gap-8'>
                    <Link to="/edit-profile" className='px-4 py-2 bg-black text-white rounded-full text-xs text-center'>Edit Profile</Link>
                    <button className='px-4 py-2 bg-black text-white rounded-full text-xs'>Reset Password</button>
                </div>
            </div>
            <div className=' mx-auto'>
            <MyProducts title={<h1 className='text-6xl font-spartan font-bold w-fit mx-auto mt-12'>Your Products🥳</h1>}/>
            </div>
        </div>
  )
}

export default MyProfile