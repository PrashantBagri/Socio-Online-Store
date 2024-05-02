import React, { useState, useRef, useEffect } from 'react'
import useAuth from '../hooks/useAuth';
import {useForm} from "react-hook-form";
import axios from 'axios';
import {ErrorMessage} from '@hookform/error-message'
import FormError from './ui/FormError';

const PRODUCT_NAME_MAX_LENGTH = 60
const PRODUCT_NAME_MIN_LENGTH = 5

const PRODUCT_DESC_MAX_LENGTH = 300
const PRODUCT_DESC_MIN_LENGTH = 15

const AddProducts = () => {
  const {auth} = useAuth();
  const formRef = useRef();
  const submitRef = useRef();

  const {register, handleSubmit, formState : {errors}} = useForm();
 
  
  const submitAddProduct = async (data) =>{
    const formData = new FormData();
    
    formData.append('image', data.image[0])
    
    Object.entries(data).forEach(([key, value])=>{
      if(key!=='image'){
        formData.append(`${key}`, value)
      }
    })
    try{

      const response =await axios.post('http://localhost:3000/api/v1/products/add-product', formData, {
        withCredentials: true,
        headers :{
          'Content-type' : 'multipart/form-data'
        }
      })
      console.log(response)
    } catch(error){
      console.log(error)
    }

  }
  

  return (
    <>
    
          <h1 className='md:text-7xl font-spartan font-semibold mx-8'>Add new Product🛍️</h1>
        <div className='my-12'>
          <form className='text-center' ref={formRef} id="form" onSubmit={handleSubmit(submitAddProduct)}>
            <div className='flex justify-evenly '>

              <div className='font-spartan flex flex-col w-[30vw] gap-8'>
                <div className='flex flex-col'>

                  <label className="text-2xl text-start font-semibold" htmlFor="name">Name of the product</label>
                  <input className={` ${errors.name? "focus:border-red-500": "focus:border-green-400" } px-6 py-2 h-[7vh] border-2 border-yellow-400 focus:outline-none focus:border-2 rounded-lg`} id='name' autoComplete='off' {...register('name', {
                    required: true,
                    maxLength : {
                      value : PRODUCT_NAME_MAX_LENGTH,
                      message : "Product name is too long."
                    },
                    minLength: {
                      value : PRODUCT_NAME_MIN_LENGTH,
                      message : "Product name is too small."
                    },
                    pattern : {
                      value : /[a-zA-z]+[0-9]*[\-]*/,
                      message : "Enter a valid product name."
                    }
                  })} />
                  {errors.name && <FormError error={errors.name.message}/>}
                </div>


                <div className='flex flex-col'>

                  <label className="text-2xl text-start font-semibold" htmlFor="description">Describe your product</label>
                  <textarea  rows={5}   className={` ${errors.description? "focus:border-red-500": "focus:border-green-400" } resize-none px-6 py-2 border-2 border-yellow-400 focus:outline-none focus:border-2  rounded-lg`}   {...register('description', {
                    required: {
                      value : true,
                      message : "This field is required."
                    },
                    minLength: {
                      value : PRODUCT_DESC_MIN_LENGTH,
                      message : "Description is too short."
                  },
                    maxLength: {
                      value : PRODUCT_DESC_MAX_LENGTH,
                      message : "Description is too long."
                    },
                  })}/>
                  {errors.description && <FormError error={errors.description.message}/>}
                </div>
                <div className='flex flex-col'>

                  <label className="text-2xl text-start font-semibold" htmlFor="price">Enter the price</label>
                  <input className={`  ${errors.price? "focus:border-red-500": "focus:border-green-400" } m-0 px-6 py-2 h-[7vh] border-2 border-yellow-400  focus:outline-none focus:border-2  rounded-lg`} type="text"  {...register('price', {
                    required:{
                      value : true,
                      message: "This field is required."
                    },
                    maxLength :{
                      value : 5,
                      message : "Amount is too large."
                    },
                    pattern : {
                      value :/[0-9]+/,
                      message : "Invalid Entry."
                    },
                  })}/>
                  {errors.price && <FormError error={errors.price.message}/>}
                </div>
                <div className='flex flex-col'>

                  <label className="text-2xl text-start font-semibold" htmlFor="price">Enter the Category</label>
                  <input placeholder='Men, Women or hoodies?' className={`  ${errors.category? "focus:border-red-500": "focus:border-green-400" } m-0 px-6 py-2 h-[7vh] border-2 border-yellow-400  focus:outline-none focus:border-2  rounded-lg`} type="text"  {...register('category', {
                    required:{
                      value : true,
                      message: "This field is required."
                    },
                    maxLength :{
                      value : 10,
                      message : "Length is too large."
                    },
                    pattern : {
                      value :/[a-zA-z]+/,
                      message : "Invalid Entry."
                    },
                  })}/>
                  {errors.category && <FormError error={errors.category.message}/>}
                </div>
              </div>

              <div className='h-[50vh] w-[1.8px] bg-black/20 rounded-full '></div>

              <div className='font-spartan flex flex-col w-[30vw] gap-8 '>
                <div className='flex flex-col'>
                  <label className="text-2xl text-start font-semibold" htmlFor="stock">Stock</label>
                  <input className={`  ${errors.stock? "focus:border-red-500": "focus:border-green-400" } px-6 py-2 h-[7vh] border-2 border-yellow-400 focus:outline-none focus:border-2  rounded-lg`} type="number" defaultValue={1} {...register('stock', {
                    required: {
                      value : true,
                      message : "This field is required."
                    },
                    max :{
                      value : 200,
                      message: "Invalid amount."
                    },
                    pattern : {
                      value :/[0-9]+/,
                      message : "Invalid Entry."
                    },
                  })}/>
                  {errors.stock && <FormError error={errors.stock.message}/>}
                </div>
                <div className='flex flex-col'>

                <label className="text-2xl text-start font-semibold" htmlFor="brand">Brand</label>
                <input placeholder='Socio' className={`${errors.brand? "focus:border-red-500": "focus:border-green-400" } px-6 py-2 h-[7vh] border-2 border-yellow-400 focus:outline-none focus:border-2  rounded-lg`} type="text" {...register('brand', {
                  required: {
                    value : true,
                    message : "This field is required."
                  },
                  minLength: {
                    value : 4,
                    message : "Brand name is too short."
                  },
                  maxLength : {
                    value : 20,
                    message : "Brand name too long."
                  },
                  pattern :{
                    value : /[a-zA-Z]+[0-9]?/,
                    message: "Invalid Entry"
                  }
                })} />
                {errors.brand && <FormError error={errors.brand.message}/>}
                </div>
                <div className='flex flex-col'>

                <label className="text-2xl text-start font-semibold" htmlFor="image">What does your product look like?</label>
                <input className="" type="file" name='image' {...register('image', {
                    required: {
                      value: true,
                      message : "This field is required."
                    }
                })}/>
                </div>
              </div>
            </div>
            <button ref={submitRef} id="submit" type='submit' className='bg-black text-2xl text-white px-12 py-4 rounded-lg mt-12 '>Submit</button>
          </form>
        </div>
    
    </>
  )
}

export default AddProducts