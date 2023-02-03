import StockPriceSchema from '../models/StockPrice'
import * as express from 'express'
import messages from "../utils/errorMessage";

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
