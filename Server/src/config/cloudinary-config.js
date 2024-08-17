import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import Constants from '../constant.js';

cloudinary.config(
    {
        cloud_name: Constants.CLOUD_NAME, 
        api_key: Constants.API_KEY, 
        api_secret: Constants.API_SECRET 
    }
)

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'devmart',
        allowedFormats: ['jpg', 'png', 'jpeg'],
        // transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
})

export {cloudinary, storage}