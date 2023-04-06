const csrf = require("csurf");
//All Dev dependency are called her
import * as express from "express";
import * as cors from "cors";
import * as config from "config";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as expressIp from "express-ip";
import * as methodOverride from "method-override";
import * as flash from "connect-flash";
import helmet from "helmet";
import { StatusCodes } from "http-status-codes";
import {logger} from './middleware/logger'
//Logger is called here


// Apply the rate limiting middleware to API calls only
export const app = express();
export const csrfProtection = csrf({
    cookie: true,
    secure: true,
  });
export const ExpressConnection = async () => {
  const secrets = config.get<string>("COOKIES");
  app.set('trust proxy', 1)
  // const csrfProtect = new csrf({ cookie: true })
  app.use(express.json({ limit : "50mb"}));
  app.use(cookieParser());
  app.use(
    session({
      secret: secrets,
      saveUninitialized: true,
      resave: true,
      cookie: { secure: true },
    })
  );
  app.use(expressIp().getIpInfoMiddleware);
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:8080",
        "http://localhost:4200",
      ],
      credentials: true,
    })
  );
  
  app.use(flash());
  app.use(helmet());
  app.use(methodOverride("X-HTTP-Method")); //          Microsoft
  app.use(methodOverride("X-HTTP-Method-Override")); // Google/GData
  app.use(methodOverride("X-Method-Override")); //      IBM
  app.use(csrfProtection);
  app.all('*', function (req, res, next) {
    try 
    {
      const myToken = req.csrfToken()
      res.locals.csrftoken = req.header['csrf-token']; 
      return res.status(StatusCodes.OK).json({ ok: true, status: StatusCodes.OK, csrf_token : myToken})
    } catch (err) {
       const error = new Error("something went wrong")
       logger.error(error)
       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ ok: false, message: err.message, status: StatusCodes.INTERNAL_SERVER_ERROR})
    }
  });

};


