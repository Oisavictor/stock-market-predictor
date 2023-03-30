import * as express from "express";
import {VAvater} from "../schema/user.schema";
import {uploadProfile} from "../services/user.service";
import { StatusCodes } from "http-status-codes";
import { logger } from "../middleware/logger";

export const profileController = async (req, res, next) => {
   const{file, user} = req
   let payload
  try {
    payload = await VAvater(file)
    const userProfile = await uploadProfile(payload, user);
    return res.status(userProfile.status).json({ ...userProfile });
  } catch (error) {
    return res
      .status(error.status)
      .json({ ok: false, status: error.status, msg: error.message });
  }
};