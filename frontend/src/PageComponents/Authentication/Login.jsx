import React, { useEffect, useState, useRef} from 'react'
import useAuth from '../../hooks/useAuth'
import axios from "../../api/axios"
import { useNavigate } from 'react-router'

const LOGIN_URL = '/users/login'

function Login() {
  const {setAuth, setPersist} = useAuth();
  const userRef = useRef();
  const navigate = useNavigate();


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  useEffect(()=>{
    userRef.current.focus();
  },[])

  useEffect(()=>{
    setError('')
  }, [username, password])

  const handleAuth = async (e)=>{
    e.preventDefault();

    try{
      const response = await axios.post(LOGIN_URL, {username, password},{
        withCredentials:true
      })
      const accessToken = response.data.data.accessToken;
      const user = response.data.data.loggedInUser;
      setAuth({user, accessToken});
      setUsername('');
      setPassword('')
      navigate("/")
    }catch(err){
      if(!err.response){
        setError('No server Response')
      }
      else if(err.response.status === 400){
        setError("Invalid Credentials")
      } else if (err.response.status == 404){
        setError("Sorry. User does not exists.")
        console.log(err.response.status)
      }
    }

  }
  
  const togglePersist = () =>{
    setPersist(prev => !prev)
  }


  return (
    <>

      <div className='h-screen font-spartan text-xl font-md flex flex-col items-center'>
        <h1 className='font-spartan font-semibold text-6xl my-6'>Login to Socio!😊</h1>
        <form className=' h-[50vh] flex flex-col gap-8  ' action="" onSubmit={handleAuth}>
              <div className='flex flex-col  text-start'>
                <label className='' htmlFor="username">Username</label>

                <input id='username' className='h-[7vh] border-2  p-4 border-black rounded-xl text-md' type="text" name='username' placeholder='Username' onChange={(e)=>setUsername(e.target.value)} ref={userRef}/>
            

              </div>
              <div className='flex flex-col  text-start'>
                <label htmlFor="password">Password</label>

                <input id='password' className='h-[7vh] border-2  p-4 border-black rounded-xl text-md' type="password" name="password"  placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                
                <div className='mt-2'>
                <input type="checkbox" onChange={togglePersist}/> Remember me.

                </div>
              </div>
              <div className='text-center'>
              <button className='px-12 py-3 bg-black/80 text-white rounded-lg' type="submit">Login</button>

              </div>

        </form>
        <div className={`bg-red-400 px-6 py-1 text-white drop-shadow-lg border-red-500 border-2 ${error? "block" : "hidden"}`}>{error}</div>
      </div>
    
    </>
  )
}

export default Login
