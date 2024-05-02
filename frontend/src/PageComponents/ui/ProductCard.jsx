import React from 'react'
import { FiPlus } from "react-icons/fi";
import useProdId from '../../hooks/useProdId';
import axios from 'axios';
import { Link } from 'react-router-dom';

 const ProductCard = (props) => {
  const {prodId,setProdId} = useProdId();
 const addToCart = async()=>{
    const response = await axios.post(`http://localhost:3000/api/v1/products/${props.id}/add-to-cart`,null,{
      withCredentials:true
    })
    console.log(response)
  }

  const handleCart = () =>{
    setProdId(props.id)
    addToCart()
  }

  return (
    <div className='mx-5 my-3  md:h-[50vh] md:w-[20vw] border-4 overflow-clip relative z-10 border-black'>
            <div className='bg-gradient-to-t from-black/80 to-transparent h-full w-full z-20 absolute'/>
            <div className='z-30  absolute bottom-5  font-spartan font-semibold text-white flex  w-full justify-between items-center px-2'>
                <div>
                    <Link to={`/products/${props.id}`}><h1 className='text-xl underline hover:text-blue-300'>{props.name}</h1></Link>
                    <p className='text-base font-normal text-white/75'>Rs.{props.price}</p>
                    <small className='font-normal text-white/50'>By {props.brand}</small>
                </div>
                <div  className='w-[3vw] h-[3vw] bg-black/2 rounded-full flex items-center justify-center bg-black/50 active:bg-black/75   cursor-pointer'>
                    <FiPlus onClick={handleCart} size={35}/>
                </div>
            </div>
            <img className='h-full w-full object-cover ' src={props.image} alt="" />
    </div>
  )
}

export default ProductCard