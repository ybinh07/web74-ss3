import express from "express";
import { registerValidator } from "./middlewares/users.middleware.js";
import { defaultErrorHandler } from "./utils/handlers.js";
import morgan from "morgan";
import { upload } from "./middlewares/upload.middlware.js";
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(morgan("tiny"));
// Middleware check register

app.get("/register", registerValidator, (req, res, next) => {
  return res.json({
    message: "Register successfully",
  });
});

app.post("/upload", upload.single("avatar"), (req, res, next) => {
  return res.json({});
});

app.use(defaultErrorHandler);

app.get(
  "/",
  (req, res, next) => {
    console.log("A");
    next();
  },
  (req, res, next) => {
    console.log("B");
    next();
  },
  (req, res, next) => {
    console.log("C");
    throw new Error("Lỗi rồi bạn eiii");
  },
  (req, res, next) => {
    console.log("D");
    next();
  },
  (err, req, res, next) => {
    return res.json({
      error: err.message,
    });
  }
);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`You are listening on PORT ${PORT}`);
  }
});
