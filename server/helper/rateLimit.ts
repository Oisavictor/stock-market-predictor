import * as express from "express";
const app = express();
import rateLimit from 'express-rate-limit';



export const apiLimiter = rateLimit ({
	windowMs: 1 * 60 * 1000, // 1 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(apiLimiter);

// export const createAccountLimiter = rateLimit({
// 	windowMs: 60 * 60 * 1000, // 1 hour
// 	max: 5, // Limit each IP to 5 create account requests per `window` (here, per hour)
// 	message:
// 		'Too many accounts created from this IP, please try again after an hour',
// 	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// })

// // app.post('/create-account', createAccountLimiter, (request, response) => {
// // 	//...
// // })