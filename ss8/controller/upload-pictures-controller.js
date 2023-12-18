import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import fsPromise from "fs/promises";
cloudinary.config({
  secure: true, // xét dạng https
  api_key: process.env.CLOUDINARI_API_KEY,
  api_secret: process.env.CLOUDINARI_API_SECREAT,
  cloud_name: process.env.CLOUDINARI_NAME,
});
export const uploadImagesController = async (req, res, next) => {
  const imagePath = req.filePaths;
  // console.log(imagePath);

  try {
    // Upload the image

    const uploadPromise = imagePath.map( (imagePath) => {
      // upload từng item trong mảng
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };

      return cloudinary.uploader.upload(imagePath, options);
    });
    const result = await Promise.all(uploadPromise); // promise.all(uploadPromise) -> chờ tất cả promise trong mảng hoàn thành
     // console.log(result)

    // lặp qua imagePath để unlink vì imagePath là mảng
    for (const path of imagePath) {
      await fsPromise.unlink(path);
    }
    const images = result.map(item => item.secure_url)
    return res.json({
      message: "upload successfully",
      number_of_pictures:images.length,
      pic : images,
    });
  } catch (error) {
    console.error(error);
  }
  
};
