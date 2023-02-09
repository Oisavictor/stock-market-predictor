//CONTROLLER
import { Request, Response } from "express";
import { logger } from "../middleware/logger";
import { YahooFinanceSymbol } from '../utils/stock/stock.api';
export const landingPage = (req: Request, res: Response) => {
  res.send("stock_market_predict test");
};


export const getStockPrice = async (req: Request, res: Response) => {
  try {
    const getParam = req.params.symbol
    const stockPrice = await YahooFinanceSymbol(getParam);
    return res.json({stockPrice});
  } catch (err) {
    const error = new Error(err);
    logger.error(error); 
    return res.status(500).json(error);
  }
};

