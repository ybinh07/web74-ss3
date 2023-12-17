import multer from "multer"
import path from "path"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve("upload/images"))
    },
    filename: function (req, file, cb) {
        
      const filedname = Date.now() + file.originalname
   
      const filePath = path.resolve(`upload/images/${filedname}`)
      req.filePaths = req.filePaths || []; // Tạo một mảng để lưu trữ các đường dẫn tệp tin
      req.filePaths.push(filePath);
      // console.log( req.filePaths)
      cb(null, filedname);
    }
  })
  
  export const upload = multer({ storage: storage })