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
exports.YahooMultiple = exports.YahooFinanceSymbol = exports.YahooFinanceApiNews = exports.YahooFinanceApi = exports.DataSetApi = exports.GoogleStockApi = exports.stockMarketApi = void 0;
const axios_1 = require("axios");
const stockMarketApi = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval&symbol=IBM&interval=5min&apikey=${process.env.API_KEY_Alpha_Vantage}`);
    const data = yield response.data;
    return data;
});
exports.stockMarketApi = stockMarketApi;
const GoogleStockApi = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-01-09?adjusted=true&apiKey=${process.env.Google_Stock_API_KEYS}`);
    const data = yield response.data;
    return data;
});
exports.GoogleStockApi = GoogleStockApi;
const DataSetApi = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://stockmarket222.iex.cloud/v1/data/stockmarket222/DATASET_IUPJF7ZB5?last=100&token=${process.env.DATA_SET_API_TOKEN}`);
    const data = yield response.data;
    return data;
});
exports.DataSetApi = DataSetApi;
//Get Trade From All NSE
const YahooFinanceApi = () => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: 'GET',
        url: 'https://yahoo-finance15.p.rapidapi.com/api/v1/sec/form4',
        headers: {
            'X-RapidAPI-Key': '3b8b473390msh31ca8d22aef0b0bp172dc7jsnb219b36c0462',
            'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
    };
    const response = yield axios_1.default.request(options);
    return response.data;
});
exports.YahooFinanceApi = YahooFinanceApi;
//News From All NSE
const YahooFinanceApiNews = () => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: 'GET',
        url: 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news',
        headers: {
            'X-RapidAPI-Key': '3b8b473390msh31ca8d22aef0b0bp172dc7jsnb219b36c0462',
            'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
    };
    const response = yield axios_1.default.request(options);
    return response.data;
});
exports.YahooFinanceApiNews = YahooFinanceApiNews;
//Get Stock by Symbol
const YahooFinanceSymbol = (symbol) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: 'GET',
        url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news/${symbol}`,
        headers: {
            'X-RapidAPI-Key': '3b8b473390msh31ca8d22aef0b0bp172dc7jsnb219b36c0462',
            'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
    };
    console.log(options.url);
    const response = yield axios_1.default.request(options);
    return response.data;
});
exports.YahooFinanceSymbol = YahooFinanceSymbol;
//Get multiple stock by symbol
const YahooMultiple = (symbol) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        method: 'GET',
        url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/AAPL,MSFT`,
        headers: {
            'X-RapidAPI-Key': '3b8b473390msh31ca8d22aef0b0bp172dc7jsnb219b36c0462',
            'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
    };
    const response = yield axios_1.default.request(options);
    return response.data;
});
exports.YahooMultiple = YahooMultiple;
