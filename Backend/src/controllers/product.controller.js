import asyncHandler from "../utils/asyncHandler.js";
import { validationResult, matchedData } from "express-validator";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {Product} from "../models/product.model.js"
import ApiResponse from "../utils/ApiResponse.js";
import { Cart } from "../models/cart.model.js";
import UploadOnCloud from "../utils/Cloudinary.js";

const addProduct = asyncHandler(async(req, res)=>{
    const result = validationResult(req);

    const validationsErrors = result.array().map(err=>err.msg)
    const data = matchedData(req)

    if(validationsErrors.length>0){
        return res.status(400).json(new ApiError(400, validationsErrors))
    }

    // console.log(req.file)

    console.log(req.file?.path)
    const productImageLocalPath = req.file?.path;

    const productImage = await UploadOnCloud(productImageLocalPath)
    
    const {name, description, price, stock, brand, category} = data;
    const  {_id} = req.user;
    console.log(data)
    const seller = await User.findById(_id).select("-password -refreshToken -address -email -cart -paymentMethod")

    const product = await Product.create({
        name,
        description,
        price,
        stock,
        image : productImage.url,
        brand,
        seller,
        category: category.toLowerCase()
    })

    seller.products.push(product);

    seller.save();

    product.save()

    return res.status(201).json(new ApiResponse(202, product,"Product Created Successfully."))
})

const removeProduct = asyncHandler(async(req, res)=>{
    const {_id} = req.user;
    const {productId} = req.params;// taking product id from url
    const product = await Product.findByIdAndDelete(productId);

    if(!product){
        return res.status(400).json(new ApiError(400, "Product does not exists"))
    }

    const user = await User.findById(_id);

    if(user.products.includes(productId)){
        user.products.splice(user.products.indexOf(productId), 1)
    }
    user.save()

    return res.status(200).json(new ApiResponse(200, "Successfully deleted product"))
})  

const getAllProducts = asyncHandler(async(req, res)=>{
    const products = await Product.find({}).select("-createdAt -updatedAt");
    if(!products){
        return res.status(404).json(new ApiError(404, "No Products found"))
    }
    return res.status(200).json(new ApiResponse(200, products, "Successfully fetched all products"))
})

const getProduct = asyncHandler(async(req, res)=>{
    const product = await Product.findById(req.params.productId);
    if(!product){
        return res.status(404).json(new ApiError(404, "Product dont exists."))
    }
    return res.status(200).json(new ApiResponse(200, product ,"Successfully fetched product."))
})

const addToCart = asyncHandler(async(req, res)=>{

    const {productId} = req.params;
    const user= req.user
    console.log(productId)
    //finding product for price;
    const product = await Product.findById(productId)
    console.log(product)
    if(!product){
        return res.status(400).json(new ApiError(400, "Product not found."))
    }
    const cart = await Cart.findById(req.user.cart);
    console.log(cart)
    const existingProduct = cart.items.find(product => product.product == productId)
    if(existingProduct){
        existingProduct.quantity++; //check again
        cart.totalPrice = cart.totalPrice + product.price
        const totalPrice = cart.totalPrice
        console.log("existing product")
        cart.save();
        return res.status(200).json(new ApiResponse(200, {existingProduct, totalPrice}, "Cart Updated"))
    }

    const item = {
        product : product ,
        quantity : 1
    }

    cart.items.push(item);
    cart.totalPrice = cart.totalPrice + product.price;
    cart.user = user;
    cart.save()

    const totalPrice = cart.totalPrice;
    return res.status(200).json(new ApiResponse(200, {item, totalPrice}, "Cart product added"))
    

})

const removeFromCart = asyncHandler(async(req,res)=>{
    const {productId} = req.params;
    const user= req.user
    const {a} = req.query
    const cart = await Cart.findById(req.user.cart);
    console.log(" QUERY---- ",a)
    
    //finding product for price;
    const product = await Product.findById(productId)
    if(!product){
        return res.status(400).json(new ApiError(400, "Product not found."))
    }
    const existingProduct = cart.items.find(product => product.product == productId)
    console.log(existingProduct)
    if(!existingProduct){
       return res.status(400).json(new ApiError(400, "Product does not exists in cart.")) 
    }
    if(a==="remove"){
        cart.items.splice(cart.items.indexOf(existingProduct), 1)
        cart.totalPrice = cart.totalPrice - (product.price*existingProduct.quantity)
        const totalPrice = cart.totalPrice
        cart.save();
        return res.status(200).json(new ApiResponse(200, {existingProduct, totalPrice}, "Product removed"))
    }
    existingProduct.quantity--; //check again
    if(existingProduct.quantity<1){
        cart.items.splice(cart.items.indexOf(existingProduct), 1)
    }
    cart.totalPrice = cart.totalPrice - product.price
    const totalPrice = cart.totalPrice
    console.log("existing product")
    cart.save();
    return res.status(200).json(new ApiResponse(200, {existingProduct, totalPrice}, "Cart Updated"))
    
})

const getUserCart = asyncHandler(async(req, res)=>{
    const  {userId} = req.params;
    const user = await User.findById(userId)
    const userCart = await Cart.findById(user.cart)
    console.log(userCart)
    return res.status(200).json(new ApiResponse(200, userCart, "Successfully fetched Cart."))   
})

const getProductByCategory = asyncHandler(async(req, res)=>{
    const {c} = req.query
    const categoryArray = ["men", "women", "hoodies"];

    if(!categoryArray.includes(c.toLowerCase())){
        res.status(400).json(new ApiError(400, "Unknown Category"))
    }

    const products = await Product.aggregate([
        {$match:{category : c.toLowerCase()}}
    ])

    

    if(!products){
       return res.status(404).json(new ApiError(404, "No products under this category."))
    }

    return res.status(200).json(new ApiResponse(200, {products}, "Succesfully fetch products."))
})

const searchProduct = asyncHandler(async(req,res)=>{
    const {q} = req.query 

    const products = await Product.find({});

    const results = products.filter(product=>product.name.toLowerCase().includes(q.toLowerCase()))

    res.json({query :q, data : results})
})



export {addProduct, removeProduct, getAllProducts, getProduct, addToCart, getUserCart ,removeFromCart, getProductByCategory, searchProduct}
