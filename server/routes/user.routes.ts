import * as express from "express";
import { AuthUser, refreshTokenAuthentication  } from "../middleware/auth/auth";
import { validateResource } from "../resources/validateResources";
import { apiLimiter } from '../helper/rateLimit';
const api = "/api/user";
import {
  createUserController,
  verifyUserByOTP,
  resendOTp,
  loginUser,
  forgottenPasswordController,
  confirmController,
  ChangePassword

} from "../controller/User.controller";
import { getStockPrice } from "../controller/StockPriceController";
import {
  createUserSchema,
  verifyUserOTPSchema,
  LoginSchema,
  forgotPasswordSchema
} from "../schema/user.schema";

export const UserRoutes = (router: any) => {
  router.post(
    `${api}/create`,
    validateResource(createUserSchema),
    createUserController,
    apiLimiter
  );

  router.post(
    `${api}/verify`,
    validateResource(verifyUserOTPSchema),
    verifyUserByOTP,
    apiLimiter
  );    

  router.post(`${api}/resend`, resendOTp, apiLimiter);
  router.post(`${api}/login`, validateResource(LoginSchema), loginUser);
  router.post(`${api}/forget-password`, validateResource(forgotPasswordSchema), forgottenPasswordController)
  router.post(`${api}/forgot/verify`, confirmController)
  router.put(`${api}/forgot/change`, ChangePassword)
  router.get(`${api}/`, AuthUser, (req, res, next) => {
    return  res.status(200).json(req.user);

  });
   router.post(`${api}/refresh`, refreshTokenAuthentication, (req, res, next) => {
    return res.status(200).json(req.user);
      
   } )
  router.get("/api/:symbol", getStockPrice);
  
}; 
