import * as express from "express";
import { apiLimiter, createAccountLimiter } from "../helper/rateLimit"
import { validateResource } from "../resources/validateResources";
import {
  createUserController,
  verifyUserByOTP,
} from "../controller/User.controller";
import { getStockPrice } from "../controller/StockPriceController";
import { createUserSchema, verifyUserOTPSchema } from "../schema/user.schema";

export const UserRoutes = (router: any) => {
  router.post(
    "/api/user",
    validateResource(createUserSchema),
    createUserController,
    createAccountLimiter
  );

  router.post(
    "/api/verify",
    validateResource(verifyUserOTPSchema),
    verifyUserByOTP
  );
  
  router.get(
    "/api/:symbol", 
    getStockPrice,
    apiLimiter
    );
};
