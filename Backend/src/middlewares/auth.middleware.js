import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js"

const verifyJWT = async function(req, res, next){
    const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    

    if(!token){
        return res.status(400).json(new ApiError(400, "Unauthorized reuqest"))
    }

    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.ACCESSTOKEN_SECRET);
    } catch (error) {
        return res.status(403).json(new ApiError(403, "Expired Token"))
    }

    const user = await User.findById(decodedToken._id).select("-password -refreshToken");

    if(!user) {
        throw new ApiError(401, "Invalid Token");
    }

    req.user = user
    next()
}

export default verifyJWT;