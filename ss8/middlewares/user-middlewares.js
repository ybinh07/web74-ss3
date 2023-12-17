import { checkSchema } from "express-validator";
import { validator } from "../utils/validator.js";
import bcrypt from "bcrypt";
import { verifyToken } from "../utils/jwt.js";
import databaseService from "../services/database-services.js";

export const registerValidator = validator(
  checkSchema(
    {
      email: {
        errorMessage: "Your email is invalid",
        isEmail: true,
        custom: {
          options: async (value, { req }) => {
            const isEmailExist = await databaseService.client.db(process.env.DB_NAME).collection('students').findOne({
              email: value,
            });
            if (isEmailExist) {
              throw new Error("Email is already exists");
            }
            return true;
          },
        },
      },
      password: {
        isLength: {
          options: { min: 8 },
          errorMessage: "Password should be at least 8 chars",
        },
      },
      confirm_password: {
        isLength: {
          options: { min: 8 },
          errorMessage: "Password should be at least 8 chars",
        },
        custom: {
          options: (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error("Confirm password must be same as password");
            }
            return true;
          },
        },
      },
    },
    ["body"]
  )
);

export const loginValidator = validator(
  checkSchema({
    email: {
      errorMessage: "Your email is invalid",
      isEmail: true,
      custom: {
        options: async (value, { req }) => {
          const isEmailExist = await databaseService.client.db(process.env.DB_NAME).collection('students').findOne({
            email: value,
          });
          if (!isEmailExist) {
            throw new Error("Email is not registered");
          }
          return true;
        },
      },
    },
    password: {
      isLength: {
        options: { min: 8 },
        errorMessage: "Password should be at least 8 chars",
      },
      custom: {
        options: async (value, { req }) => {
          const user = await databaseService.client.db(process.env.DB_NAME).collection('students').findOne({
            email: req.body.email,
          });
          const isExact = bcrypt.compareSync(value, user.password);
          if (!isExact) {
            throw new Error("Your passsword is incorrect");
          }
          req.user = user;
          return true;
        },
      },
    },
  })
);

export const accessTokenValidator = validator(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value, { req }) => {
            if (!value) {
              throw new Error("Access token is required");
            }
            const access_token = value.split(" ")[1];
            const decode_authorization = await verifyToken({
              token: access_token,
              secretOrPublicKey: process.env.PRIVATE_KEY,
            });
            req.decode_authorization = decode_authorization;
            console.log(decode_authorization)
            return true;
          },
        },
      },
    },
    ["headers"]
  )
);
