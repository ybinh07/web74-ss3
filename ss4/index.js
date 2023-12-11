import express from "express";
import { loginValidator} from "./middlewares/loginValidator-middleware.js";
import { loginController } from "./controllers/loginController.js";
import { registerValidator } from "./middlewares/registerValidator-middleware.js";
import { registerController } from "./controllers/registerController.js";
import databaseService from "./services/database-services.js";
import { fetchdb } from "./utils/fetchData.js";
const app = express();
const PORT = 1000;

databaseService.run()
await fetchdb(databaseService.client);
app.use(express.json());
// tạo ra access_token khi login
app.post("/login", loginValidator,loginController);
app.post("/register", registerValidator,registerController);

app.listen(PORT,((err)=>{
    if(err){
        console.log(err.message);
    }else{
        console.log(`your server is login on PORT ${PORT}`)
    }
}))
