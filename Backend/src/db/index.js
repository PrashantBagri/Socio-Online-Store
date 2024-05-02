import mongoose from "mongoose";

const ConnectDB = async() => {
    try {
        const ConnectionInstance = await mongoose.connect(`${process.env.DB_CONNECTION_URI}/${process.env.DB_NAME}`);
        console.log(`Database Connected. | Host : ` , ConnectionInstance.connection.host)
    } catch (error) {
        console.log("Error connecting to database. Error : " , error.message)       
        process.exit(1)
    }
}

export {ConnectDB};