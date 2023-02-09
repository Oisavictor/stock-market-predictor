// import * as express from 'express';
import { sellingPrice } from '../services/greet.service';

export const postDiscount = async (req, res) => {
    const { sales } = req.body;
    const discount = await sellingPrice(sales);
    return res.status(200).json(discount);
};