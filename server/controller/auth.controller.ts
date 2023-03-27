import * as express from "express";
import {
  VRegister,
  VOtpVerification,
  VLogin,
  VChangePassword,
  VForgetPassword
} from "../schema/joiSchema";
import {
  createUser,
  VerifyUser,
  LoginUser,
  resendOTP,
  forgottenPassword,
  changePasswordService,
} from "../services/auth.service";
import { StatusCodes } from "http-status-codes";

export const createUserController = async (req, res, next) => {
   const{ body} = req
   let payload
  try {
    payload = await VRegister(body)

    const user = await createUser(payload);
    return res.status(user.status).json({ ...user });
  } catch (error) {
    return res
      .status(error.status)
      .json({ ok: false, status: error.status, msg: error.message });
  }
};

//Verify User account 
export const verifyUserByOTP = async (req, res, next) => {
  const  { body } = req
  let payload
  try {
    payload = await VOtpVerification(body)
    const user = await VerifyUser(payload);
    return res.status(user.status).json({ ...user });
  } catch (error) {
    return res
      .status(error.status)
      .json({ ok: false, status: error.status, msg: error.message });
  }
};
export const resendOTp = async (req, res, next) => {
  try {
    const user = await resendOTP(req.body);
    return res.status(user.status).json({ ...user });
  } catch (error) {
    return res
      .status(error.status)
      .json({ ok: false, status: error.status, msg: error.message });
  }
};
export const loginUser = async (req, res, next) => {
  const { body } = req;
  let payload;

  try {
    payload = await VLogin(body);
    const loginUser = await LoginUser(payload);
    const cookieOption = {
      expiresIn: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.cookie("cookie", loginUser.body?.refresh_Token, cookieOption);
    return res.status(loginUser.status).json({ ...loginUser });
  } catch (error) {
    console.error(error);
    return res.status(error.status).json({ ...error });
  }
 

};

export const forgottenPasswordController = async (req, res, next) => {
   const { body } = req
   let payload
  try {
    payload = await VForgetPassword(body)
    const user = await forgottenPassword(payload);
    return res.status(StatusCodes.OK).json({ ...user });
  } catch (error) {
    console.error(error);
    return res.status(error.status).json({ ...error });
  }
};


export  const resetPasswordController  = async (req, res, next) => {
  const {body} = req
  let payload
  try {
    payload= await VChangePassword(body)
    console.log(payload)
    const user = await changePasswordService(payload);
    return res.status(StatusCodes.OK).json({ ...user });
  } catch (error) {
    console.error(error);
    return res.status(error.status).json({ ...error });
  }
}