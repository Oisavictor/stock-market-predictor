import * as express from "express";
export const Routes = (router: any) => {

  router.get("/healthCheck", (req, res, next) => {
    res.sendStatus(200);
    next();
  });
  router.get('/', (req, res) => {
    res.send("stock_market_predict test");
  })
};

