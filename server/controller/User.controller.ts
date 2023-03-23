import * as express from "express";

import {
  createUser,
  VerifyUser,
  LoginUser,
  resendOTP,
  forgottenPassword,
  changePassword,
} from "../services/user.service";
import { StatusCodes } from "http-status-codes";

export const createUserController = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    return res.status(user.status).json({ ...user });
  } catch (error) {
    return res
      .status(error.status)
      .json({ ok: false, status: error.status, msg: error.message });
  }
};
export const verifyUserByOTP = async (req, res, next) => {
  try {
    const user = await VerifyUser(req.body);
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
  try {
    const user = await LoginUser(req.body);
    const cookieOption = {
      expiresIn: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.cookie("cookie", user.body?.refresh_Token, cookieOption);
    return res.status(user.status).json({ ...user });
  } catch (error) {
    return res
      .status(error.status)
      .json({ ok: false, status: error.status, msg: error.message });
  }
};

export const forgottenPasswordController = async (req, res, next) => {
  try {
    const user = await forgottenPassword(req.body);
    return res.status(StatusCodes.OK).json({ ...user });
  } catch (error) {}
};

export const confirmController = async (req, res, next) => {
  try {
    const user = await changePassword(req.body);
    return res.status(StatusCodes.OK).json({ ...user });
  } catch (error) {}
};
