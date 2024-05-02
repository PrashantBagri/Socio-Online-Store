import mongoose, {Schema} from "mongoose";

const cartSchema = new Schema({
    items : [
        {
        product : {   
            type: Schema.Types.ObjectId,
            ref : "Product",
            required : true
        },
        quantity : {
            type: Number,
            required : true
        }
    }
    ],
    refreshToken : {
        type : String,
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    totalPrice : {
        type : Number,
        required : true,
        default : 0
    }
}, {timestamps : true});




export const Cart = mongoose.model("Cart", cartSchema)