import React, { useState, useRef, useEffect } from "react";
import {
  RiSearchLine,
  RiUserLine,
  RiShoppingCartLine,
  RiMenuFill,
} from "react-icons/ri";
import Slider from "./Slider";
import CartSlider from "./CartSlider";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { IoMdPower } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import useDropDown from "../../hooks/useDropDown";
import useLogout from "../../hooks/useLogout";
import Search from "./Search";


function Navbar() {
  const { dropDown, setDropDown } = useDropDown();
  const pfpRef = useRef();
  const navigate = useNavigate();
  
  const [slider, setSlider] = useState(false);
  
  const { auth } = useAuth();
  const logout = useLogout();

useEffect(()=>{

  const handleClickOutside = (e)=>{
    if(!e.target.closest(".dropDownMenu") && e.target !== pfpRef.current ){
      setDropDown(false)
    }else{
      setDropDown(true)
    }
  }
  if(dropDown){
    window.addEventListener('click',handleClickOutside)
  }

  return()=>{
    window.removeEventListener('click', handleClickOutside)
  }

},[dropDown])


const handleDropDown = () => {
    setDropDown((prev) => !prev);
  };

const handleShoppingCart = () => {
    setSlider((slider) => !slider);
  };

const logoutUser = async() =>{
  await logout();
  navigate(to="/")
  
}





  return (
    <>
      <div className=" flex justify-between p-4 items-center border-b-2 border-black mb-16">
        <Link className="w-[10%] md:w-[15%]" to="/">
          <img src="/Socio.svg" alt="" />
        </Link>
        <span className="hidden md:block">
          <ul className="flex w-[125%] gap-12 justify-between text-md font-spartan">
            <li className="hover:backdrop-blur-lg hover:bg-black/10 px-3 py-1 rounded-md transition-all duration-200 cursor-pointer ">
               <Link to="/men">Men</Link>
            </li>
            <li className="hover:backdrop-blur-lg hover:bg-black/10 px-3 py-1 rounded-md transition-all duration-200 cursor-pointer">
            <Link to="/women">Women</Link>
            </li>
            <li className="hover:backdrop-blur-lg hover:bg-black/10 px-3 py-1 rounded-md transition-all duration-200 cursor-pointer">
            <Link to="/hoodies">Hoodies</Link>
            </li>
          </ul>
        </span>
        <span className="hidden md:flex md:gap-4 ">
          <span >

              <Search/>

           
          </span>
          {!auth.user ? (
            <Link
              className="bg-black/80 p-5 text-white cursor-pointer rounded-full"
              to="/login"
            >
              <RiUserLine />
            </Link>
          ) : (
            <>
              <span className="  text-white cursor-pointer rounded-full overflow-clip h-[8vh] w-[8vh]">
                <img
                ref={pfpRef}
                className=""
                  src={auth.user.avatar}
                  height={50}
                  onClick={handleDropDown}
                  alt=""
                />
              </span>
              {/* DropDown */}

              <div
                className={` dropDownMenu bg-white  w-[12vw]  absolute top-24 right-12 z-50 border-black border-4 rounded-lg 
                    h-fit flex flex-col gap-1 font-spartan font-semibold transition-all   ${
                      dropDown
                        ? "block"
                        : "hidden"
                    }`}
              >
                <ul>
                  <li className=" m-1 p-2 rounded-sm border-1 flex gap-2 items-center hover:bg-black/80 hover:text-white hover:rounded-lg cursor-pointer">
                  <Link className="flex gap-2 items-center" to="/me"> My Profile <RiUserLine /></Link>
                  </li>
                  <li className=" m-1 p-2 rounded-sm border-1 flex gap-2 items-center hover:bg-black/80 hover:text-white hover:rounded-lg cursor-pointer">
                   <Link className="flex gap-2 items-center" to="/my-products"> My Products <IoBagCheckOutline /></Link>
                  </li>
                  <li onClick={logoutUser} className=" m-1 p-2 rounded-sm border-1 flex gap-2 items-center hover:bg-black/80 hover:text-white hover:rounded-lg cursor-pointer">
                    <p>Logout</p> <IoMdPower />
                  </li>
                </ul>
              </div>
            </>
          )}
          <span
            className="bg-black/80 text-white p-5 h-[3.75vw] w-[3.75vw] rounded-full cursor-pointer "
            onClick={handleShoppingCart}
          >
            <RiShoppingCartLine />
          </span>
        </span>
        <span
          className="md:hidden bg-black/80 text-white p-5 rounded-full"
          onClick={handleShoppingCart}
        >
          <RiMenuFill />
        </span>
      </div>

      <div
        className={` fixed z-50 transition-all w-screen overflow-auto bg-[#121212] duration-200  ${
          !slider ? `-bottom-[100%] ` : `bottom-0`
        }`}
      >
        <div className=" flex justify-center bg-white ">

        <Slider>
          <CartSlider handleShoppingCart={handleShoppingCart} slider={slider}></CartSlider>
        </Slider>
        </div>
      </div>
    </>
  );
}

export default Navbar;

    













// Working solution 
      // useEffect(()=>{
    
      //   const handleClickOutside = (e) =>{
      //       if(e.target !==pfpRef.current) {
      //         console.log("hello")
      //         setDropDown(false)
      //       }
      //       else {
      //         return
      //       }
      //   }
        
    
      //   if(dropDown){
      //     window.addEventListener('click',handleClickOutside)
      //   }
    
      //   return ()=>{
      //     window.removeEventListener('click', handleClickOutside)
      //   }
        
      // },[dropDown])