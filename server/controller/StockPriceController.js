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
exports.predictStockPrice = exports.getStockPrice = exports.landingPage = void 0;
const stock_service_1 = require("../services/stock.service");
const logger_1 = require("../middleware/logger");
const landingPage = (req, res) => {
    res.send("stock_market_predict test");
};
exports.landingPage = landingPage;
const getStockPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stockSymbol = req.params.stockSymbol;
        const stockPrice = yield (0, stock_service_1.getStockPriceServices)({ stockSymbol });
        return res.json(Object.assign({}, stockPrice));
    }
    catch (err) {
        const error = new Error(err);
        logger_1.logger.error(error);
        return res.status(500).json(error);
    }
});
exports.getStockPrice = getStockPrice;
const predictStockPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, stock_service_1.PredictStock)(req.body);
        return res.status(201).json(Object.assign({}, data));
    }
    catch (err) {
        const error = new Error(err);
        logger_1.logger.error(error);
        return res.status(500).json(error);
    }
});
exports.predictStockPrice = predictStockPrice;
