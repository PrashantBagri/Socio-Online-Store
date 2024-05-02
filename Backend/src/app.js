import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin : `${process.env.CORS_ORIGIN}`,
    // origin : `http://localhost:5173/`,
    credentials : true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}))
app.use(express.json({limit : '100kb'}));
app.use(express.urlencoded({extended : true, limit : "100kb"}))
app.use(cookieParser())

import userRouter from "./routes/user.route.js"
import productRouter from "./routes/product.route.js"

app.use("/api/v1/users", userRouter)
app.use("/api/v1/products", productRouter)


export default app;
