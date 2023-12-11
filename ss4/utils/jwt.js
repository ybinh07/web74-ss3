import { config } from "dotenv"
import jwt from "jsonwebtoken"
config() // cònig() dùng để đọc các biến môi trường trong tệp env không có cònig không dùng được process.env.biến_môi_trường
export const signToken = ({payload})=>{
  return new Promise((resolve, reject)=>{
    // jwt.sign gồm 3 tham số (payload, secretOrPrivateKey, [options, callback]) 
    //hàm gọi lại sẽ được gọi với tham số là lỗi (err) hoặc JWT
    const secretKey = process.env.PRIVATE_KEY
    jwt.sign(
      {payload},
      secretKey,
      {algorithm:'HS256',
      expiresIn: '4h'},
      (err,token)=>{
        if(err){
          reject(err);
        }
        resolve(token);
      }
    );
  } )
}

export const verifyToken =({token, secrectOrPublicKey})=>{
  return new Promise ((resolve, reject)=>{
    jwt.verify(token,secrectOrPublicKey,(err,decode) => {
      //token : chuỗi JWT cần xác thực 
      if(err){
        reject(err);
      }
      resolve(decode)
    
    })
})
}