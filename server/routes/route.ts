import * as express from "express";
import '../config/index'
import {
  landingPage,

} from "../controller/StockPriceController";


export const Routes = (router: any) => {

  router.get("/healthCheck", (req, res, next) => {
    res.sendStatus(200);
    next();
  });

  router.get('/', landingPage)


};

