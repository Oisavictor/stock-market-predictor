import * as express from "express";
import { createUserController } from '../controller/User.controller'
import {
  landingPage,
  getStockPrice,
  predictStockPrice,
} from "../controller/StockPriceController";
export const Routes = (router: any) => {
  router.get("/healthCheck", (req, res, next) => {
    res.sendStatus(200);
    next();
  });
  router.get("/:stockSymbol", getStockPrice);
  router.post("/", predictStockPrice);
  router.get("/", landingPage);

  //User testing route
  router.post('/user', createUserController)
};
