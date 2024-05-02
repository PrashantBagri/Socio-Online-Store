import React from 'react'
import './Hero.styles.css'
import { Link } from 'react-router-dom';

function Hero() {


  return (
    <div className=' flex flex-col items-center gap-12 '>
        <h1 className="text-center text-6xl md:text-9xl font-spartan   animate-moveInUp" >Elevate The Style</h1>
        <Link to="/products" className='px-16 py-4 backdrop-blur-md absolute border-black border-2 text-primary-background font-spartan left-[45%] top-[80%] delay-1000 animate-moveInUp'>Shop Now</Link>
        <div className="h-[100vh] w-[75vw] md:-[50vw] bg-black/0 rounded-xl border-solid border-4 border-black overflow-clip  ">
          <img className="object-cover object-top  h-full w-full" src="HeroImg.jpg" alt="" />
        </div>
    </div>
  )
}

export default Hero