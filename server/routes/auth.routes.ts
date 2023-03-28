import * as express from "express";
import { AuthUser, refreshTokenAuthentication } from "../middleware/auth/auth";
import { apiLimiter } from '../helper/rateLimit';
import {upload} from '../middleware/multer';
import {
  createUserController,
  verifyUserByOTP,
  resendOTp,
  loginUser,
  forgottenPasswordController,
  resetPasswordController
} from "../controller/auth.controller";
import { getStockPrice } from "../controller/StockPriceController";


const api = "/api/user";

export const UserRoutes = (router: any) => {
  router.post( `${api}/upload`, upload.single('avater'), async (req, res, next) => {
    const avater = req.file
    console.log(avater)
  })
  router.post(
    `${api}/create`,
    createUserController,
    apiLimiter
  );

  router.post(
    `${api}/verify`,
    verifyUserByOTP,
    apiLimiter
  );

  router.post(`${api}/resend`, resendOTp, apiLimiter);
  router.post(`${api}/login`,  loginUser, apiLimiter); 
  router.post(`${api}/forget-password`,  forgottenPasswordController)
  router.put(`${api}/forgot/password`, resetPasswordController)
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
