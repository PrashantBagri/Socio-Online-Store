import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import CartCard from "./ui/CartCard";

function CheckoutCart() {
  const [totalPrice, setTotalPrice] = useState();
  const [order, setOrder] = useState();

  const { auth } = useAuth();

  const fetchCart = async () => {
    let response = {};
    try {
      response = await axios.get(
        `http://localhost:3000/api/v1/products/${auth.user._id}/${auth.user.cart}`,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
    console.log(response);
    setTotalPrice(response?.data?.data?.totalPrice);

    const items = response?.data?.data?.items;
    const endpoints = [];
    items?.forEach((Id) => {
      endpoints.push(`http://localhost:3000/api/v1/products/${Id.product}`);
    });
    const itemData = await axios.all(
      endpoints.map((endpoint) => {
        return axios.get(endpoint, {
          withCredentials: true,
        });
      })
    );

    const dataFinal = [];

    itemData.forEach((product) => {
      items.forEach((item) => {
        if (product.data.data._id === item.product) {
          dataFinal.push({
            ...product.data.data,
            ...item,
          });
        }
      });
    });

    setOrder(dataFinal);
  };
  console.log(auth);
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      <div className="w-fit mx-auto">
        <h1 className="font-spartan text-5xl w-fit mx-auto font-semibold">Checkout now. Thanks for shopping!🥰</h1>
      <div className="flex flex-row justify-center flex-wrap">
        {order?.map((product) => {
          return (
            <CartCard
              cartUpdate={fetchCart}
              key={product.product}
              id={product.product}
              name={product.name}
              price={product.price}
              brand={product.name}
              image={product.image}
              quantity={product.quantity}
            />
          );
        })}
      </div>
            <div className="flex justify-between mb-24 mt-12 mx-24">
            <div className="w-fit mx-12 flex items-center">
        <span className="font-spartan text-2xl font-medium">Total Amount</span>
        <span className="bg-pink-500 border-pink-800 mx-12 border-2 text-white font-spartan px-6 py-2">Rs. {totalPrice}</span>
      </div>

      <button className="px-4 py-2 text-white bg-black/70 border-2 border-black ">CheckOut</button>
            </div>
      </div>
    </>
  );
}

export default CheckoutCart;
