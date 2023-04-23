import * as express from "express";
import { csrfProtection } from '../express'
import {
  createUserController,
  verifyUserByOTP,
  resendOTp,
  loginUser,
  forgottenPasswordController,
  resetPasswordController
} from "../controller/auth.controller";
import { refreshTokenAuthentication, AuthUser } from "../middleware/auth/auth";
import { StatusCodes } from "http-status-codes";
import {ApiResponse} from '../interface/api.response'

const auth: string = "/api/auth";

export const AuthRoutes = (router: any) => {
  router.post( `${auth}/create`, createUserController, );
  router.post(`${auth}/verify`,verifyUserByOTP,);
  router.post(`${auth}/resend`, resendOTp,);
  router.post(`${auth}/login`,  loginUser); 
  router.post(`${auth}/forget-password`,  forgottenPasswordController)
  router.put(`${auth}/forgot/password`, resetPasswordController)
  router.get(`${auth}/refresh`, refreshTokenAuthentication, (req, res): Promise<ApiResponse> => {
    return res.status(StatusCodes.OK).json({ok: true, status: StatusCodes.OK, message: 'New token generated', body: { token : req.user}})
  })
  
}; 
