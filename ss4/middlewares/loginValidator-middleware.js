import { fetchdb } from "../utils/fetchData.js";

export const loginValidator = async (req, res, next) => {
  const { email, password } = req.body;
  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if (!(email && password)) {
    return res.status(400).json({ error: 'Invalid value' });
  }

  if (!regex.test(email)) {
    return res.status(401).json({ error: 'Your email is invalid' });
  }

  const data = await fetchdb();
  let findEmail = false;

  for (const item of data) {
    if (item.email === email) {
        findEmail = true;
      if (item.password !== password) {
        return res.status(402).json({ error: 'Incorrect password' });
      }
      break;
    }
  }

  if (!findEmail) {
    return res.status(403).json({ error: 'Email does not exist. You have to register' });
  }

  next();
};