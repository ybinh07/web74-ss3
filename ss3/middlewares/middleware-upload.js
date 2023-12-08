import multer from 'multer'
import path from 'path'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, path.resolve('upload/images'))
    },
    filename: function (req, file, cb) {
    // console.log(file)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileName =  uniqueSuffix + '-' + file.originalname
    const filePath = path.resolve(`upload/images/${fileName}`) // đứng ở đâu cũng lấy gốc là ở ngoài cùng và trỏ vào thư mục cần
    req.filepath = filePath // gán filePath vào request để bên controller dùng 
    //console.log(filePath);
    cb(null,fileName);
    }
})

export const upload = multer({ storage: storage })