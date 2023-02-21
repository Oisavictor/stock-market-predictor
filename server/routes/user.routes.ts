import * as express from "express";
import { apiLimiter } from "../helper/rateLimit";
import { validateResource } from "../resources/validateResources";
import {
  createUserController,
  verifyUserByOTP,
} from "../controller/User.controller";
import { getStockPrice } from "../controller/StockPriceController";
import { createUserSchema, verifyUserOTPSchema } from "../schema/user.schema";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message:
    "Too many requests from this IP, please try again after 15 minutes"
});

app.use(apilimiter); 

export const UserRoutes = (router: any) => {
  router.post(
    "/api/user",
    validateResource(createUserSchema),
    createUserController
  );

  router.post(
    "/api/verify",
    validateResource(verifyUserOTPSchema),
    verifyUserByOTP,
    apiLimiter
  );
  
  router.get(
    "/api/:symbol", 
    getStockPrice,
    apiLimiter
    );
};

