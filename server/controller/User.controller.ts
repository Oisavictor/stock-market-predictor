import * as express from "express";
import {
  createUser,
  VerifyUser,
  LoginUser,
  resendOTP,
  forgottenPassword,
  confirmCodeForPassswordConfirmation,
  changePassword
} from "../services/user.service";

import { StatusCodes } from "http-status-codes";

export const createUserController = async (req, res, next): Promise<Object> => {
  const user = await createUser(req.body);
  return res.status(StatusCodes.CREATED).json({ ...user });
};
export const verifyUserByOTP = async (req, res, next) => {
  const user = await VerifyUser(req.body);
  return res.status(StatusCodes.OK).json({ ...user });
};
export const resendOTp = async (req, res, next) => {
  const user = await resendOTP(req.body);
  return res.status(StatusCodes.OK).json({ ...user });
};
export const loginUser = async (req, res, next) => {
  const user = await LoginUser(req.body);
  const cookieOption = 
  {
      expiresIn : new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true
  }
  res.cookie("cookie", user.refresh_Token, cookieOption)
  return res.status(StatusCodes.OK).json({ ...user });
};

export const forgottenPasswordController = async (req, res, next) => {
  const user = await forgottenPassword(req.body);
  return res.status(StatusCodes.OK).json({ ...user });
};

export const confirmController = async (req, res, next) => {
    const user  = await confirmCodeForPassswordConfirmation(req.body)
    return res.status(StatusCodes.OK).json({ ...user });
}
export const ChangePassword = async (req, res, next) => {
  const user = await changePassword(req.body)
  return res.status(StatusCodes.OK).json({ ...user });
} 