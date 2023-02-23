import * as express from "express";
import { AuthUser } from "../middleware/auth/auth";
import { validateResource } from "../resources/validateResources";
import { apiLimiter } from '../helper/rateLimit';
const api = "/api/user";
import {
  createUserController,
  verifyUserByOTP,
  resendOTp,
  loginUser,
} from "../controller/User.controller";
import { getStockPrice } from "../controller/StockPriceController";
import {
  createUserSchema,
  verifyUserOTPSchema,
  LoginSchema,
} from "../schema/user.schema";

export const UserRoutes = (router: any) => {
  router.post(
    `${api}/create`,
    validateResource(createUserSchema),
    createUserController,
    apiLimiter
  );

  router.post(
    "${api}/verify",
    validateResource(verifyUserOTPSchema),
    verifyUserByOTP,
    apiLimiter
  );

  router.post(`${api}/resend`, resendOTp, apiLimiter);
  router.post(`${api}/login`, validateResource(LoginSchema), loginUser, apiLimiter);
  router.get("/welcome", AuthUser, (req, res, next) => {
    return res.status(200).json(req.user);
  });
  router.get("/api/:symbol", getStockPrice);
};
