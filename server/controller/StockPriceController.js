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
exports.getStockPrice = void 0;
const logger_1 = require("../middleware/logger");
const stock_api_1 = require("../utils/stock/stock.api");
const getStockPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getParam = req.params.symbol;
        const stockPrice = yield (0, stock_api_1.stockMarketApi)();
        return res.json({ stockPrice });
    }
    catch (err) {
        const error = new Error(err);
        logger_1.logger.error(error);
        return res.status(500).json(error);
    }
});
exports.getStockPrice = getStockPrice;
