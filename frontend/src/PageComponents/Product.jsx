import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import axios from "../api/axios";
import { useNavigate } from "react-router";


function Product() {
  const { productId } = useParams();
  const [data, setData] = useState();
  const effectRan = useRef(false);
  const [sellerName, setSellerName] = useState("");
  const navigate = useNavigate();

 

  useEffect(() => {
    const controller = new AbortController();
    if (effectRan.current === true) {
      const getProduct = async () => {
        const response = await axios.get(`/products/${productId}`, {
          signal: controller.signal,
        });
        setData(response.data.data);
        const seller = await axios.get(`/users/${response.data.data.seller}`);
        console.log(seller.data.data);
        setSellerName(seller.data.data);
      };

      getProduct();
    }
    return () => {
      effectRan.current = true;
      controller.abort();
    };
  }, [productId]);

  const addToCart = async()=>{
    const response = await axios.post(`http://localhost:3000/api/v1/products/${data._id}/add-to-cart`,null,{
      withCredentials:true
    })
    console.log(response)
  }

  const handleAddToCart = () =>{
    addToCart();
  }
  const handleBuy = () =>{
    navigate("/order", {state:{productData : data}})
  }

  return (
    <>
      <div className=" w-[80vw] mx-auto  h-screen flex font-spartan">
        <div className="w-[40vw]">
          <div className="w-[30vw] h-[80vh] mx-auto bg-black overflow-clip border-black border-4">
            <img
              src={data?.image}
              alt=""
              className="object-cover h-full w-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 my-10 ">
          <h1 className=" text-5xl text-black font-medium">{data?.name}</h1>
          <small>By {data?.brand}</small>
          <p className="w-[35vw] text-md font-normal text-black/80">
            {data?.description}
          </p>
          <p>
            <span className="font-bold">For</span> {data?.category}
          </p>
          <p className="font-normal mt-8">
            <span className="font-bold">At</span> Rs. {data?.price}
          </p>

          <div className="flex gap-4 mt-8">
            <button onClick={handleBuy} className="bg-black px-12 py-4 text-white">Buy Now</button>
            <button onClick={handleAddToCart} className="bg-black px-12 py-4 text-white">
              Add to Cart
            </button>
          </div>

          <p className="mt-8 px-3 py-1 bg-red-500 w-fit text-white text-xs rounded-lg">
            Only <span className="font-bold ">{data?.stock}</span> left
          </p>

          <p className="text-2xl mt-8">
            Sold By 
            <p className="text-xl font-bold">{sellerName.fullName}</p>
                <p className="text-xs ">{sellerName.username}</p>
            
          </p>
        </div>
      </div>
    </>
  );
}

export default Product;
