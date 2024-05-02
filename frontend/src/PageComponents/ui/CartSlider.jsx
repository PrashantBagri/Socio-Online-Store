import React, { useEffect, useState, useRef } from 'react'
import {RxCross2} from 'react-icons/rx' 
import useAuth from '../../hooks/useAuth'
import axios from 'axios';
import CartCard from './CartCard';
import { Link } from 'react-router-dom';

function CartSlider({handleShoppingCart, slider}) {
  const [cart, setCart] = useState();
  const effectRef = useRef(false);
  const cartRef = useRef();
  const [totalPrice, setTotalPrice] = useState(0);

  const {auth} = useAuth();

  const userId = auth.user?._id;
  const userCartId = auth.user?.cart


  const fetchCart = async() =>{

    let response = {};
    try {
        response = await axios.get(`http://localhost:3000/api/v1/products/${userId}/${userCartId}`, {
        withCredentials : true,
      })
    } catch (error) {
      console.log(error)  
    }
    console.log(response)
    setTotalPrice(response.data.data.totalPrice);
    
    
    const items = response?.data?.data?.items
    const endpoints = [];
    items?.forEach((Id)=>{
      endpoints.push(`http://localhost:3000/api/v1/products/${Id.product}`)
    })
    const itemData =  await axios.all(endpoints.map(endpoint=>{
      return axios.get(endpoint, {
        withCredentials: true,
      })
    }))

    const dataFinal = [];

    itemData.forEach((product)=>{
      items.forEach(item=>{
        if(product.data.data._id === item.product){

          dataFinal.push({
            ...product.data.data,
            ...item
          })
        }
      })
    })

    setCart(dataFinal)
  }

  useEffect(()=>{
    if(slider){
      fetchCart();
    }
  }, [slider])




  return (
    <div ref={cartRef} className="h-[90vh]">

            <div  onClick={handleShoppingCart} className='text-white flex justify-end'>
                <RxCross2 className='stroke-current stroke-1 mx-2 my-4 fixed'  size={25}/>
            </div>
                <h1 className='text-7xl font-semibold font-spartan text-white my-4 mx-4 '>Cart</h1>
              <div className='flex justify-between'>
                <h3 className='px-12 py-4 bg-blue-400 w-fit border-blue-600 border-2 font-spartan text-white font-semibold text-xl my-4'>Total Price : {totalPrice} </h3>
                <Link to="/checkout" className='px-12 py-4 bg-pink-400 w-fit border-pink-600 border-2 font-spartan text-white font-semibold text-xl my-4 rounded-xl cursor-pointer hover:bg-pink-500 active:border-pink-700 active:bg-pink-500 select-none'>Check Out</Link>
              </div>

            <div className='flex flex-row   justify-center flex-wrap'>
              {cart?.map((product)=>{
                  return <CartCard cartUpdate={fetchCart} key={product.product} id={product.product} name={product.name} price={product.price} brand={product.name} image={product.image} quantity={product.quantity}/>
              })}
            </div>
            
    </div>
  )
}

export default CartSlider