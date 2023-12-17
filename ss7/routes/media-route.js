import { Router } from "express";
import { accessTokenValidator } from "../middlewares/user-middlewares";
import { upload } from "../../ss8/utils/upload";
import { uploadImagesController } from "../../ss8/controller/upload-pictures-controller";

const mediaRoute = Router()
mediaRoute.post("upload/images", accessTokenValidator, upload.array('pictures',10),uploadImagesController)