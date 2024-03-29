import * as express from "express";
import {VAvater} from "../schema/user.schema";
import {uploadProfile, EditUser} from "../services/user.service";
import { logger } from "../middleware/logger";
import { StatusCodes } from "http-status-codes";

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
      .json({ ok: false, status:error.status, message: error.message }); 
  }
};
export const EditController = async (req, res, next) => {
   const{body, user} = req
   let payload
  try {
    payload = await body
    const editUser = await uploadProfile(payload, user);
    return res.status(editUser.status).json({ ...editUser });
  } catch (error) {
    const err = new Error("Something went wrong")
    logger.error(err)
    return res
      .status(error.status)
      .json({ ok: false, status:error.status, message: error.message }); 
  }
};