import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js"
import { validationResult, matchedData } from "express-validator"
import UploadOnCloud from "../utils/Cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js"
import {options} from "../utils/Constants.js";
import jwt from "jsonwebtoken";
import { Cart } from "../models/cart.model.js";


const generateAccessAndRefreshToken = async function(userId) {
    try{
        const user = await User.findById(userId)
        
        const accessToken = user.generateUserAccessToken();
        const refreshToken = user.generateUserRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});
        return {accessToken, refreshToken}
    }
    catch{
        return {statusCode : 500, message : "Error Generating Tokens"}
    }
}   

const registerUser = asyncHandler(async(req, res)=>{
    const result  =  validationResult(req);
    
    const data = matchedData(req)

    const errors = result.array().map(err=> err.msg);

    if(result.array().length>0){
        return res.status(400).json(new ApiError(400 ,errors))
    }

    const avatarLocalPath = req.file.path 

    //Upload on cloudinary

    const avatar = await UploadOnCloud(avatarLocalPath)

    if(!avatar){
        return res.status(500).json(new ApiError(500, 'Error uploading Avatar'))
    }
    //crerating users cart 
    let totalPrice;
    const userCart = await Cart.create({
        items : [],
        totalPrice,
    })
    const user = await User.create({
            fullName : data.fullName,
            username : data.username,
            email : data.email,
            avatar : avatar.url,
            password : data.password,
            cart : userCart
        })
    
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    
    return res.status(200).json(new ApiResponse(200, createdUser , "User Created Successfully"))
    

})

const loginUser = asyncHandler(async(req, res)=>{
    const result = validationResult(req);
    const {username, password} = matchedData(req)

    const errors = result.array().map(err=>err.msg)

    if(result.array().length>0){
        return res.status(400).json(new ApiError(400 ,errors))
    }

    const user = await User.findOne({username})

    if(!user){
        return res.status(404).json(new ApiError(404, "User does not exists"))
    }    

    const passwordVerified = await user.passwordVerified(password);

    if(!passwordVerified){
        return res.status(400).json(new ApiError(400, "Wrong Password"))
    }  

    const tokens = await generateAccessAndRefreshToken(user._id)

    if(tokens.statusCode){
        return res.status(500).json(new ApiError(500, "Error while generating tokens"))
    }

    const {accessToken, refreshToken} = tokens;

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    return res.status(202).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(new ApiResponse(202, {accessToken, refreshToken, loggedInUser} ,"User logged in successfully"))

// console.log(user)
})

const logoutUser = asyncHandler(async(req,res)=>{
    const {_id} = req.user;

    await User.findByIdAndUpdate(
        _id,
        {
            $unset :{
                refreshToken : 1
            }
        },
        {new : true}
    )

    return res.status(202).json(new ApiResponse(202, {}, "User Logged out successfully"))
})

const resetPassword = asyncHandler(async(req,res)=>{

    const result = validationResult(req);

    const {newPassword, confirmPassword, oldPassword} = matchedData(req);

    const errors = result.array().map(err=>err.msg)

    if(errors.length>0){
        return res.status(400).json(new ApiError(400, errors))
    }

    if(newPassword ===oldPassword){
        return res.status(400).json(new ApiError(400, "New password cannot be the old password."))
    }

    if(newPassword !== confirmPassword){
        return res.status(400).json(new ApiError(400, "New Password and cofirmed password do not match."))
    }

    const user = await User.findById(req.user._id);

    user.password = newPassword;
    await user.save();

    return res.status(201).json(new ApiResponse(201, {
        user: user.username,
    },
        "Password succefully changed."
    ))

})

const renewAccessToken = asyncHandler(async(req, res)=>{
    const token = req.cookies.refreshToken || req.body.refreshToken;
    if(!token){
        return res.status(400).json(new ApiError(400, "Unauthorized request."))
    }
    let user;
    try{
        user = jwt.verify(token, process.env.REFRESHTOKEN_SECRET);
    }
    catch(err){
        return res.status(403).json(new ApiResponse(400, "Token Expired"))
    }
    
    if(!user) {
        return res.status(400).json(new ApiResponse(400, "Invalid Token"))
    }

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const tokens = await generateAccessAndRefreshToken(user._id);

    if(tokens.statusCode){
        return res.status(500).json(new ApiError(500, "Error Generating tokens"))
    }   
    
    const {accessToken, refreshToken} = tokens;
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(new ApiResponse(200, {loggedInUser, accessToken, refreshToken}, "Successfully renewed tokens."))


})

const getUser = asyncHandler(async(req,res)=>{  
    const {userId} = req.params
        const user = await User.findById(userId).select("-password -refreshToken")
        if(!user) {
            res.status(404).json(new ApiError(404, "user not found"))
        }
    
    res.status(200).json(new ApiResponse(200, user, "Successfully fetched user"))
   
})

const editUser = asyncHandler(async(req,res)=>{
    const {username} = req.params;
    const data = req.body
    console.log(req?.file)
    let avatar ;
    let user ;
    if(req?.file){
        avatar = await UploadOnCloud(req?.file?.path)
        user = await User.findOneAndUpdate({username : username}, {avatar : avatar.url}, {
            new:true
        })
    }else{
        user = await User.findOneAndUpdate({username : username}, data, {
            new:true
        })
    }
    
     
    res.status(200).json(new ApiResponse(200, {user} ,"User updated successully."))
})


export {registerUser, loginUser, logoutUser, resetPassword, renewAccessToken, getUser, editUser}