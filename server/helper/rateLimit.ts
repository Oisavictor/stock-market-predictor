<<<<<<< HEAD
import * as express from 'express';
import { rateLimit } from 'express-rate-limit';

const app = express();


export const apiLimiter = rateLimit ({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
=======
import * as express from "express";
const app = express();
import rateLimit from 'express-rate-limit';



export const apiLimiter = rateLimit ({
	windowMs: 1 * 60 * 1000, // 1 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
>>>>>>> 6904fb3e8e7d7518982e911908961f8d19ce9d97
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

<<<<<<< HEAD
app.use('/api/', apiLimiter);
=======
app.use(apiLimiter);
>>>>>>> 6904fb3e8e7d7518982e911908961f8d19ce9d97

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