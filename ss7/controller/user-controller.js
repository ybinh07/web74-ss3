import { ObjectId } from "mongodb";
import databaseService from "../services/database-services.js";
import userService from "../services/user-services.js";


export const registerController = async (req, res, next) => {
  const access_token = await userService.register(req.body);
  return res.json({
    message: "Register successfully",
    result: {
      access_token,
    },
  });
};

export const loginController = async (req, res, next) => {
  const user_id = req.user._id;
  const access_token = await userService.login(user_id);
  return res.json({
    message: "Login successfully",
    result: {
      access_token,
    },
  });
};

export const getMeController = async (req, res, next) => {
  const {user_id} = req.decode_authorization
  if(user_id){
    const user = await  databaseService.client.db(process.env.DB_NAME).collection('students').findOne({
      _id : new ObjectId(user_id)
    },{
      projection:{
        password: 0 // ẩn thông tin password | password: 1 -> chỉ lấy ra password, ẩn hết thông tin còn lại và kèm id
      }
    })
    return res.json({
      message: 'get info user successfully',
      result: user
    })
  }
};
