import React,{useEffect, useState, useRef} from 'react'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import ProductCard from './ui/ProductCard';
import axios from 'axios';
import { useLocation } from 'react-router';

function MyProducts(props) {
const {auth} = useAuth();
const axiosPrivate = useAxiosPrivate();
const [data, setData] = useState()
const effectRan = useRef(false)
const location = useLocation();

const userProducts = auth.user.products

useEffect(()=>{

    const controller = new AbortController();
    if(effectRan.current !==false){

        const getProducts = async () =>{
            const endpoints = userProducts.map(id=>{
                return `http://localhost:3000/api/v1/products/${id}`
            })
            try {
                const response = await axios.all(endpoints.map(endpoint=>{
                   return axiosPrivate.get(endpoint,{
                    signal : controller.signal
                   })
                }))  
                console.log(response)
    
                setData(response)
            } catch (error) {
                console.log(error)
            } 
    
           
    
        }
        getProducts()
    }

    return ()=>{
        effectRan.current = true
        controller.abort();
    }

},[])

  return (
    <>
        {location.pathname==="/my-products" ? (<div><h1 className='text-6xl font-spartan font-bold w-fit mx-auto'>Products by you 💅</h1></div>) : props.title}
        
        <div className='flex'>
        {
            data?.map(product =>{
                return <ProductCard
                key={product.data.data._id}
                id={product.data.data._id}
                name={product.data.data.name}
                brand={product.data.data.brand}
                price={product.data.data.price}
                image={product.data.data.image}
                />
            })
        }

        </div>

    </>
  )
}

export default MyProducts