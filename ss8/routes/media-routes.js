import { Router } from "express";



import { upload } from "../utils/upload.js";
import { uploadImagesController } from "../controller/upload-pictures-controller.js";
import { accessTokenValidator } from "../middlewares/user-middlewares.js";


const mediaRoute = Router()
mediaRoute.post("/upload-pictures", accessTokenValidator, upload.array('pictures',10), uploadImagesController)
export default mediaRoute