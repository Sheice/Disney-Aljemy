import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
config({path: '.env'})

cloudinary.config({
  cloud_name: process.env.CN_CLOUD_NAME,
  api_key: process.env.CN_API_KEY,
  api_secret: process.env.CN_API_SECRET,
  secure: true,
});

export const uploadImage = async (filePath) => {
  try {
    return await cloudinary.uploader.upload(filePath);
  } catch (error) {
    return error.message;
  }
};

export const destroyImage = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};
