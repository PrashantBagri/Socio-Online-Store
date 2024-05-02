import { useEffect, useState, useRef } from "react"
import axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ProductCard from "./ui/ProductCard";

function Hoodies() {
    const [data, setData] = useState();
    const axiosPrivate = useAxiosPrivate();
    const effectRan = useRef(false);
   const category = "hoodies";
    useEffect(()=>{

        const controller = new AbortController();
        if(effectRan.current!== false) {
          const getMenProducts = async () =>{
            const response = await axiosPrivate.get(`http://localhost:3000/api/v1/products/category?c=${category}`, {
                withCredentials : true
            })

            console.log(response.data.data.products)
            setData(response.data.data.products)
          }
          getMenProducts()
        }

        return ()=>{
          effectRan.current = true;
          controller.abort();
        }

    },[])


  return (
    <>
    <h1 className="font-spartan w-fit mx-auto text-8xl font-semibold">Hoodies😎</h1>
    <div className=" flex justify-center">
    {data?.map(product=>{
      return <ProductCard key={product._id} id={product._id} name={product.name} brand={product.brand} price={product.price} image={product.image}/>
    })}
    </div>
    </>
  )
}

export default Hoodies