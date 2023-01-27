"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Model is using mongoose
const mongoose_1 = __importDefault(require("mongoose"));
const StockPriceSchema = new mongoose_1.default.Schema({
    companyName: {
        type: String,
        required: false
    },
    stockSymbol: {
        type: String,
        required: true,
        unique: true
    },
    predictedPrice: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});
exports.default = mongoose_1.default.model('StockPrice', StockPriceSchema);
