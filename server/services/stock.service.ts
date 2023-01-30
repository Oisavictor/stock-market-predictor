import StockPriceSchema from '../models/StockPrice'
import * as express from 'express'
import messages from "../utils/errorMessage";
//All get all the stock from the Database
export const getStockPriceServices = async (payload: any): Promise<Object> => {
    const getPrice = await StockPriceSchema.find(payload)
    if(!getPrice) return { 
        ok: false, status: 404, 
        msg: messages.StockNotFound
    }
    return getPrice
}
//Predict stock
export const PredictStock = async (payload: any): Promise<Object>  => {
     const predict = await StockPriceSchema.create(payload)
     const savePredict = await predict.save()
     if (!predict)
     return { 
        ok: false, msg: 
        messages.StockPrediction 
    };
     return savePredict

}