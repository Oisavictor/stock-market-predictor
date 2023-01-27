//CONTROLLER
import { Request, Response } from 'express';
import StockPrice from '../models/StockPrice';

export const landingPage = (req: Request, res: Response) => {
    res.send("stock_market_predict test");
};

export const getStockPrice = async (req: Request, res: Response) => {
    try {
        const stockSymbol = req.params.stockSymbol;
        const stockPrice = await StockPrice.findOne({ stockSymbol });
        if (stockPrice) {
            res.status(200).json({
                message: 'Stock Price retrieved successfully',
                data: stockPrice
            });
        } else {
            res.status(400).json({
                message: 'Stock Price not found'
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

export const predictStockPrice = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const stockPrice = new StockPrice(data);
        const savedStockPrice = await stockPrice.save();
        res.status(201).json({
            message: 'Stock Price Predicted successfully',
            data: savedStockPrice
        });
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};