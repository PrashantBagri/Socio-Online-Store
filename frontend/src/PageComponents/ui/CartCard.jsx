import React, {useState, useEffect} from 'react'
import { GoTrash } from "react-icons/go";
import axios from 'axios';
import useProdId from '../../hooks/useProdId';

function CartCard(props) {
  

  const deleteProduct = async() =>{
    const response = await axios.post(`http://localhost:3000/api/v1/products/${props.id}/remove-from-cart?a=remove`,null,{
      withCredentials:true
    })
    console.log(response)
    props.cartUpdate();
  }

  const incQuantity = async ()=>{
    const response = await axios.post(`http://localhost:3000/api/v1/products/${props.id}/add-to-cart`,null,{
      withCredentials:true
    })
    props.cartUpdate();
  }
  const decQuantity = async ()=>{
    const response = await axios.post(`http://localhost:3000/api/v1/products/${props.id}/remove-from-cart`,null,{
      withCredentials:true
    })
    props.cartUpdate();
  }


  const handleIncrease = () =>{
    incQuantity()
  }
  const handleDecrease = () =>{
    decQuantity()
  }
  


  return (
    <div className='font-spartan relative w-[40vw] h-[25vh] bg-white flex items-center px-4 border-4 border-red-300 rounded-md mx-6 my-4'>
        <span className='w-[8vw] h-[18vh] flex justify-center bg-black rounded-md border-2 border-black drop-shadow-3xl overflow-clip'>
            <img className=' object-cover' src={props.image} alt="" />
        </span>
        <div className='mx-6 h-[15vh] w-[0.1vw] bg-black/50 rounded-full' />

        <div className='w-full flex flex-row justify-between'>
        <div>
            <h1 className='text-xl font-semibold '>{props.name}</h1>
            <p className='text-base'>Rs.{props.price}</p>
            <small>By {props.brand}</small>
        </div>

        <div className='flex items-center h-[5vh] border-2 border-black select-none'>
            <div className='px-3 font-bold cursor-pointer active:bg-black/20 ' onClick={handleIncrease}>+</div>
            <hr className='w-[0.2vh] h-[3vh] bg-black'/>
            <span className='mx-2 font-bold'>
                   {/* {quantity <1 ? setQuantity(1) : quantity}  */}
                   {props.quantity>0 ? props.quantity : 1}
                   {/* {response.data.data.existingProduct.quantity} */}
            </span>
            <hr className='w-[0.2vh] h-[3vh] bg-black'/>
            <div className='px-3 font-bold cursor-pointer active:bg-black/20 '  onClick={handleDecrease}>-</div>
        </div>
        </div>
        
        <GoTrash onClick={deleteProduct} className='stroke-1 absolute bottom-5 right-5' size={20} />
    </div>
  )
}

export default CartCard