import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_KEY, 
  api_secret: process.env.CLOUD_SECRET 
});

const UploadOnCloud = async (fileLocalPath) =>{
    try{
        const response = await cloudinary.uploader.upload(fileLocalPath, {
            resource_type : "image"
        });
        fs.unlinkSync(fileLocalPath);
        console.log("File Uploaded Successfully")
        return response;
    }
    catch{
        fs.unlinkSync(fileLocalPath)
        return null
    }
}

export default UploadOnCloud;