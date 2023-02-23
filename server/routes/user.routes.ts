import * as express from "express";
import {AuthUser} from '../middleware/auth/auth'
import { validateResource } from "../resources/validateResources";
import {
  createUserController,
  verifyUserByOTP,
  loginUser,
} from "../controller/User.controller";
import { getStockPrice } from "../controller/StockPriceController";
import { createUserSchema, verifyUserOTPSchema, LoginSchema} from "../schema/user.schema";

export const UserRoutes = (router: any) => {
  router.post(
    "/api/user/create",
    validateResource(createUserSchema),
    createUserController
  );

  router.post(
    "/api/verify",
    validateResource(verifyUserOTPSchema),
    verifyUserByOTP
  );
  router.post("/api/user/login", 
  validateResource(LoginSchema),
  loginUser
  )

  router.get('/welcome', AuthUser, (req, res) => {
    return res.status(200).json(req.user)
  })
 
};
