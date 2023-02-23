import * as express from "express";
import {AuthUser} from '../middleware/auth/auth'
import { validateResource } from "../resources/validateResources";
const api = '/api/user';
import {
  createUserController,
  verifyUserByOTP,
  resendOTp,
  loginUser,
} from "../controller/User.controller";
import { getStockPrice } from "../controller/StockPriceController";
import { createUserSchema, verifyUserOTPSchema, LoginSchema} from "../schema/user.schema";

export const UserRoutes = (router: any) => {
  router.post(
    `${api}/create`,
    validateResource(createUserSchema),
    createUserController
  );

  router.post(
    `${api}/verify`,
    validateResource(verifyUserOTPSchema),
    verifyUserByOTP
  );
  router.post(`${api}/resend`, 
  resendOTp)
  router.post(`${api}/login`, 
  validateResource(LoginSchema),
  loginUser
  )

  router.get('/welcome', AuthUser, (req, res) => {
    return res.status(200).json(req.user)
  })
 
};
