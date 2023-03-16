import * as express from "express";
import { AuthUser, refreshTokenAuthentication } from "../middleware/auth/auth";
import { validateResource } from "../resources/validateResources";
import { apiLimiter } from '../helper/rateLimit';
import {
  createUserController,
  verifyUserByOTP,
  resendOTp,
  loginUser,
  forgottenPasswordController,
  confirmController
} from "../controller/User.controller";
import { getStockPrice } from "../controller/StockPriceController";
import {
  createUserSchema,
  verifyUserOTPSchema,
  LoginSchema,
  forgotPasswordSchema
} from "../schema/user.schema";

const api = "/api/user";

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
  router.post(`${api}/login`, validateResource(LoginSchema), loginUser, apiLimiter);
  router.post(`${api}/forget-password`, validateResource(forgotPasswordSchema), forgottenPasswordController)
  router.put(`${api}/forgot/verify`, confirmController)
  router.get(`${api}/portal`, AuthUser, (req, res, next) => {
    return res.status(200).json(req.user);
  });
  router.post(`${api}/refresh`, refreshTokenAuthentication, (req, res, next) => {
    return res.status(200).json(req.user);
  })
  router.get("/api/:symbol", getStockPrice);
  router.delete(`${api}/logout`, refreshTokenAuthentication, function(req, res, next) {
  const cook = res.clearCookie('connect.sid', '', {expires: new Date(1), path: '/' });
  console.log(cook)
 return res.status(403).status({ ok: true, msg: 'Logout'}); 
}); 
}; 
