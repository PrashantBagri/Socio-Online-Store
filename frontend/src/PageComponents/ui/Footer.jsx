import React from 'react';
import {RiFacebookCircleFill, RiInstagramFill, RiTwitterXFill} from "react-icons/ri";

function Footer() {
  return (
    <>
        <footer className='h-[40vh] bg-gray-800 flex flex-col md:justify-around gap-8 items-baseline md:items-center text-white '>
          <div className='flex '>

            {/* contact */}
            <div className=' h-[25vh] w-[40vw] md:w-[25vw] my-5 p-3 flex flex-col justify-center'>
                <h1 className='font-spartan font-semibold md:text-xl'>Contact</h1>
                <div className=' text-xs md:text-lg'>
                  <p className='font-spartan'>socioMock@gmail.com</p>
                  <p className='font-spartan'>+91********</p>
                </div>
                <h2 className="font-spartan font-semibold text-md md:text-xl">Address</h2>
                <p className='font-spartan text-xs md:text-lg'>
                  A35, Lorem Ipsum, Lorem 
                </p>
            </div>
            {/* Product */}
            <div className='hidden md:h-[25vh] md:w-[25vw] md:my-5 md:p-3 md:flex md:flex-col md:justify-center'>
                  <h1 className='font-spartan font-semibold md:text-xl'>Product</h1>
                  <ul className='font-spartan text-lg'>
                    <li className='cursor-pointer'>Men</li>
                    <li className='cursor-pointer'>Women</li>
                    <li className='cursor-pointer'>Hoodies</li>
                    <li className='cursor-pointer'>Accessories</li>
                  </ul>
            </div>
            {/* Socials */}
            <div className=' h-[25vh] w-[40vw] md:w-[25vw] my-5 p-3 flex flex-col justify-center'>
              <h1 className='font-spartan font-semibold md:text-xl'>Connect With Us</h1>
              <ul className='flex flex-col gap-2 font-spartan text-xs md:text-lg'>
                <li className='flex items-center gap-2 cursor-pointer'><span><RiTwitterXFill/></span>@sociofashiontwts</li>
                <li className='flex items-center gap-2 cursor-pointer'><span><RiInstagramFill/></span>@sociofashionins</li>
                <li className='flex items-center gap-2 cursor-pointer'><span><RiFacebookCircleFill/></span>@sociofashionfb</li>
              </ul>
            </div>
          </div>
        <div className="h-8 bg-gray-500 w-full text-white text-xs text-center flex flex-col justify-center ">Made with love By Prashant ❤️</div>
        </footer>
    </>
  )
}

export default Footer