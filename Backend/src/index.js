import {config} from "dotenv";
import { ConnectDB } from "./db/index.js";
import app from "./app.js";

config({
    path : "./.env"
})

ConnectDB().then(()=>{
    app.listen(process.env.PORT || 3000, ()=>{
        console.log("Server is running on server : ", process.env.PORT)
    })
}).catch((error)=>{
    console.log("Error connecting to server : ", error.message )
})