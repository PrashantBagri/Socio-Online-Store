import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import ProductCard from "./ui/ProductCard.jsx";

function Products() {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const effectRan = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    if (effectRan.current !== false) {
      const getProducts = async () => {
        try {
          const response = await axiosPrivate.get("/products", {
            signal: controller.signal,
          });
          console.log(response.data);
          setData(response.data.data);
        } catch (err) {
          console.log(err);
          navigate("/login", { state: { from: location }, replace: true });
        }
      };
      getProducts();
      
    }
    return () => {
      effectRan.current = true;
      controller.abort();
    };
  }, []);

  return (
    <>
      <h1 className="md:text-6xl text-4xl font-spartan font-semibold text-center">
        Shopii-Shop!!😘
      </h1>
      <div className="flex flex-wrap flex-grow justify-center mt-16">
        {data?.map((product) => {
          return (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              brand={product.brand}
              image={product.image}
            />
          );
        })}
        ;
      </div>
    </>
  );
}

export default Products;
