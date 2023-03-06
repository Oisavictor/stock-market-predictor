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
//Logger is called here
import { logger } from "./middleware/logger";
//All routes file is called here
import { Routes } from "./routes/route";
import { UserRoutes } from "./routes/user.routes";
//import prisma to connect automatically
import { connectPrisma } from "./connectPrisma";
//Express connection
import rateLimit from "express-rate-limit";
const csrf = require("csurf");

// Apply the rate limiting middleware to API calls only
export const ExpressConnection = async () => {
  const csrfProtection = csrf({
    cookie: true,
    secure: true,
  });
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
  const PORT = config.get<number>("PORT");
  const app = express();
  // app.set('trust proxy', 1)
  // const csrfProtect = new csrf({ cookie: true })
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
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
  app.use(function (req, res, next) {
    // const myToken = req.csrfToken()
    res.locals.csrftoken = req.headers["csrf-token"];
    // console.log(myToken)
    next();
  });
  // app.use('/', router);
  app.use("/api", apiLimiter);
  UserRoutes(app);
  Routes(app);
  await connectPrisma();
  app.listen(PORT, () => {
    logger.info(`app is been listen to on http://localhost:${PORT}`);
  });
};

ExpressConnection();
