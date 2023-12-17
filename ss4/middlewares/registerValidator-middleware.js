import { MongoClient } from "mongodb";
import { fetchdb } from "../utils/fetchData.js";

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@sessionmongo.tpsqgdh.mongodb.net/`;

export const registerValidator = async (req, res, next) => {
  const { firstName, lastName, email, password, confirm_password } = req.body;

  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  // kiểm tra email và password có được nhập chưa
  if (!(email && password)) {
    return res.json({ message: 'Invalid value' });
  }
  // kiểm tra định dạng email
  if (!regex.test(email)) {
    return res.json({ message: 'Your email is invalid' });
  }
  // đọc database để check email
  const data = await fetchdb();
  // biến kiểm tra
  let duplicateEmail = false;
  // tìm email trong data xem email đã tồn tại chưa
  for (const item of data) {
    if (item.email === email) {
      duplicateEmail = true;
      break;
    }
  }

  
  if (duplicateEmail) {
    return res.json({ message: 'Email has existed. You must use a different email' });
  }

  if (password !== confirm_password) {
    return res.json({ message: 'Password and confirm password must be matched' });
  }
  // nếu email chưa tồn tại trong database và pass = confirm_pass thì thêm account vào db
  const client = new MongoClient(uri);
  await client.connect();
  const dbUse = client.db(process.env.DB_NAME);
  const infStu = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password
  }
  req.infStu = infStu
  dbUse.collection("students").insertOne(infStu);
  next();
};