//CONTROLLER
import { Request, Response } from "express";
import {PredictStock } from "../services/stock.service";
import { logger } from "../middleware/logger";
import { stockMarketApi } from '../utils/stock/stock.api';
export const landingPage = (req: Request, res: Response) => {
  res.send("stock_market_predict test");
};


export const getStockPrice = async (req: Request, res: Response) => {
  try {
    const stockPrice = await stockMarketApi();
    return res.json({stockPrice});
  } catch (err) {
    const error = new Error(err);
    logger.error(error); 
    return res.status(500).json(error);
  }
};

export const predictStockPrice = async (req: Request, res: Response) => {
  try {
    const data = await PredictStock(req.body);
    return res.status(201).json({ ...data });
  } catch (err) {
    const error = new Error(err);
    logger.error(error);
    return res.status(500).json(error);
  }
};
