"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLimiter = void 0;
const express = require("express");
const express_rate_limit_1 = require("express-rate-limit");
const app = express();
exports.apiLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use('/api/', exports.apiLimiter);
// export const createAccountLimiter = rateLimit({
// 	windowMs: 60 * 60 * 1000, // 1 hour
// 	max: 5, // Limit each IP to 5 create account requests per `window` (here, per hour)
// 	message:
// 		'Too many accounts created from this IP, please try again after an hour',
// 	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// })
// app.post('/create-account', createAccountLimiter, (request, response) => {
// 	//...
// })
