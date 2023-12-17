import { ObjectId } from "mongodb";


import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.js";
import databaseService from "./database-services.js";
import User from "../models/schemas/user-schemas.js";

class UserService {
  async register(payload) {
    const user_id = new ObjectId();
    await databaseService.client.db(process.env.DB_NAME).collection('students').insertOne(
      new User({
        ...payload,
        _id: user_id,
        password: bcrypt.hashSync(payload.password, +process.env.HASH_ROUND),
      })
    );
    const access_token = await signToken({ payload: user_id });
    return access_token;
  }
  async login(user_id) {
    const access_token = await signToken({ payload: user_id });
    return access_token;
  }
}

const userService = new UserService();

export default userService;
