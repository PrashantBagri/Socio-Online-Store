import { useEffect, useState, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ProductCard from "./ui/ProductCard";

function WomenProducts() {
  const [data, setData] = useState();
  const axiosPrivate = useAxiosPrivate();
  const effectRan = useRef(false);
  const category = "women";
  useEffect(() => {
    const controller = new AbortController();
    if(effectRan.current!== false){
      const getMenProducts = async () => {
        const response = await axiosPrivate.get(
          `http://localhost:3000/api/v1/products/category?c=${category.toLowerCase()}`,
          {
            withCredentials: true,
          }
        );
  
        setData(response.data.data.products);
        console.log(response)
      };
      getMenProducts();
    }

    return ()=>{
      effectRan.current = true;
      controller.abort();
    }
    
  }, []);

  return (
    <>
      <h1 className="font-spartan w-fit mx-auto text-8xl font-semibold">
        For Women👧
      </h1>
      <div className=" flex justify-center">
        {data?.map((product) => {
          return (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              brand={product.brand}
              price={product.price}
              image={product.image}
            />
          );
        })}
      </div>
    </>
  );
}

export default WomenProducts;
