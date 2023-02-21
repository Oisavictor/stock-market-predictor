import * as express from "express";
const app = express();
import { rateLimit } from 'express-rate-limit';



export const apiLimiter = rateLimit ({
	windowMs: 1 * 60 * 1000, // 1 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
});

app.use(apiLimiter);
