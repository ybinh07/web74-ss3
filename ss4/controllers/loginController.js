import { signToken } from "../utils/jwt.js";

export const loginController = async(req, res, next) => {
    const id_user = Math.floor(Math.random()*100);
    const access_token = await signToken({payload: id_user})
    return res.json({
        message: 'login successfully',
        result : {
            access_token
        }
    })
}

