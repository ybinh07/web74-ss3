import { fetchdb } from "../utils/fetchData.js";

export const loginValidator = async (req, res, next) => {
  const { email, password } = req.body;
  const regex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  // kiểm tra đã nhập email và password chưa
  if (!(email && password)) {
    return res.status(400).json({ error: "Invalid value" });
  }
  // kiểm tra định dạng email
  if (!regex.test(email)) {
    return res.status(401).json({ error: "Your email is invalid" });
  }
  // đọc database nếu nhập đủ email và pass để check account
  const data = await fetchdb();
  // biến kiểm tra
  let findEmail = false;

  for (const item of data) {
    // nếu tồn tại email trong database thì check tiếp pass
    if (item.email === email) {
      findEmail = true;
      if (item.password !== password) {
        return res.status(402).json({ error: "Incorrect password" });
      }
      break;
    }
  }
  // không tồn tại email
  if (!findEmail) {
    return res
      .status(403)
      .json({ error: "Email does not exist. You have to register" });
  }

  next();
};
