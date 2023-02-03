import * as express from "express";
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

  router.get("/stock", getStockPrice);
  router.post("/", predictStockPrice);
  router.get("/", landingPage);


};

