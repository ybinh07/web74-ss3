import express from "express";
import { config } from "dotenv";
import databaseService from "./services/database-services.js";
import userRoute from "./routes/user-route.js";

const app = express();
const PORT = 7000;

app.use(express.json());

databaseService.run();

app.use("/users", userRoute);

app.use((err, req, res, next) => {
  return res.json({
    error: err,
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error ${err.message}`);
  } else {
    console.log(`Your server is listening on PORT ${PORT}`);
  }
});
