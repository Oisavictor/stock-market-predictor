import * as express from "express";


export const Routes = (router: any) => {

  router.get("/healthCheck", (req, res, next) => {
    res.sendStatus(200);
    next();
  });
 
  router.get((req, res, next) => {
    if (res.status(404)) {
      return res.send("When you are trying to get what u don't have ");
    }

    next();

  });
  
};

