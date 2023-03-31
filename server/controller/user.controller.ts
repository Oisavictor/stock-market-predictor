import * as express from "express";
import {VAvater} from "../schema/user.schema";
import {uploadProfile} from "../services/user.service";
import { logger } from "../middleware/logger";

export const profileController = async (req, res, next) => {
   const{file, user} = req
   let payload
  try {
    payload = await file
    const userProfile = await uploadProfile(payload, user);
    return res.status(userProfile.status).json({ ...userProfile });
  } catch (error) {
    const err = new Error("Something went wrong")
    logger.error(err)
    return res
      .status(error.status)
      .json({ ok: false, status: error.status, message: error.message });
  }
};