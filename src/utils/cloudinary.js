import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dfyzsd5dk",
  api_key: "174298153462267",
  api_secret: "bkesnZu-oN8a57Bt94mw1Yy4mzY",
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
