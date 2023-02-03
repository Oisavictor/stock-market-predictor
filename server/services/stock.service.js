"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictStock = exports.getStockPriceServices = void 0;
const StockPrice_1 = require("../models/StockPrice");
const errorMessage_1 = require("../utils/errorMessage");
//All get all the stock from the Database
const getStockPriceServices = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const getPrice = yield StockPrice_1.default.find(payload);
    if (!getPrice)
        return {
            ok: false, status: 404,
            msg: errorMessage_1.default.StockNotFound
        };
    return getPrice;
});
exports.getStockPriceServices = getStockPriceServices;
//Predict stock
const PredictStock = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const predict = yield StockPrice_1.default.create(payload);
    const savePredict = yield predict.save();
    if (!predict)
        return {
            ok: false, msg: errorMessage_1.default.StockPrediction
        };
    return savePredict;
});
exports.PredictStock = PredictStock;
