import express from "express";
import databaseService from "./services/database-services.js";
// import { uploadController } from "./controller/upload-controller.js";
// import { upload } from "./middlewares/middleware-upload.js";
const app = express();
const PORT = 5000;

databaseService
// app.post("/upload",upload.single('pictures'),uploadController)
app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`You are listening on PORT ${PORT}`)
    }
});