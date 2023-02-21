import * as express from "express";
<<<<<<< HEAD
import { apiLimiter } from "../helper/rateLimit"
=======
import { apiLimiter } from "../helper/rateLimit";
>>>>>>> 6904fb3e8e7d7518982e911908961f8d19ce9d97
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
<<<<<<< HEAD
    createUserController
=======
    createUserController,
>>>>>>> 6904fb3e8e7d7518982e911908961f8d19ce9d97
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
