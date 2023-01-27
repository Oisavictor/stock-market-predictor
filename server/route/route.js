"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//ROUTE
const express_1 = __importDefault(require("express"));
const StockPriceController_1 = require("../controller/StockPriceController");
const router = express_1.default.Router();
router.get('/:stockSymbol', StockPriceController_1.getStockPrice);
router.post('/', StockPriceController_1.predictStockPrice);
router.get("/", StockPriceController_1.landingPage);
exports.default = router;
