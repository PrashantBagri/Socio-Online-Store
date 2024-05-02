import React from 'react'
import useAuth from './useAuth'
import axios from '../api/axios';

function useLogout() {

  const {setAuth} = useAuth();

  const logout = async ()=>{
    setAuth({});
    try {
        const logout = await axios.post('/users/logout', {
            withCredentials : true
        })
    } catch (error) {
        console.log(error)
    }
  }
return logout
}

export default useLogout