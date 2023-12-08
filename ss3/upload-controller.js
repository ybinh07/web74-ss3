import fs from "fs"
  export const uploadController = (req,res, next) => {
      console.log(req.filepath);
      const filePath = req.filepath
      const data = fs.readFileSync(filePath,'base64');
      const image = `data:image/png;base64,${data}`
      fs.unlinkSync(filePath)
    return res.json({
      message: 'Upload successfully',
      image
    });
  }

