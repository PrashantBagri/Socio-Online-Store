import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    fullName : {
        type : String,
        required : true,
        trim : true
    },
    username : {
        type : String,
        required : true,
        unique : true,
        index : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    address : {
        type : String,
    },
    cart : 
        {
            type : Schema.Types.ObjectId,
            ref : "Cart"
        },
    avatar : {
        type : String,
    },
    paymentMethod : {
        type : String,
    },
    refreshToken : {
        type : String
    },
    password: {
        type : String,
        required : true
    },
    products : [
        {
            type : Schema.Types.ObjectId,
            ref : "Product"
        }
    ]
},{timestamps: true})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
});

userSchema.methods.passwordVerified =  function(password){
    return  bcrypt.compare(password, this.password)
}

userSchema.methods.generateUserAccessToken = function(){
 return jwt.sign(
    {
        _id : this._id,
        username : this.username,
        email : this.email,
    },
    process.env.ACCESSTOKEN_SECRET,
    {
        expiresIn : process.env.ACCESSTOKEN_EXPIRY
    }
 )
}

userSchema.methods.generateUserRefreshToken= function(){
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESHTOKEN_SECRET,
        {
            expiresIn: process.env.REFRESHTOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema);