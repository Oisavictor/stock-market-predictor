import { app } from "../../express";
import * as config from "config";
import { ExpressConnection } from "../../express";
import { StatusCodes } from "http-status-codes";
import { AuthRoutes } from "../../routes/auth.routes";
import { UserRoutes } from "../../routes/user.routes";
import { connectPrisma } from "../../connectPrisma";
import { logger } from "../../middleware/logger";
import { apiLimiter } from "../../middleware/loader/limiter";


const PORT = config.get<number>("PORT");
//Express connection

export const Connections = async () => {
  await ExpressConnection();
  app.use("/api", apiLimiter);
  AuthRoutes(app);
  UserRoutes(app);
 
  await connectPrisma();
  app.get("/", (req, res) => {
    return res.send("Happy coding");
  });
  app.get("*", (req, res, next) => {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({
        ok: false,
        status: StatusCodes.NOT_FOUND,
        message: "Route not found",
        body: { IP: req.ip, method: req.method, url: req.baseUrl },
      });
  });
  app.listen(PORT, () => {
    logger.info(`app is been listen to on http://localhost:${PORT}`);
  });
};
Connections();
