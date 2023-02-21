"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const rateLimit_1 = require("../helper/rateLimit");
const validateResources_1 = require("../resources/validateResources");
const User_controller_1 = require("../controller/User.controller");
const StockPriceController_1 = require("../controller/StockPriceController");
const user_schema_1 = require("../schema/user.schema");
const UserRoutes = (router) => {
    router.post("/api/user", (0, validateResources_1.validateResource)(user_schema_1.createUserSchema), User_controller_1.createUserController);
    router.post("/api/verify", (0, validateResources_1.validateResource)(user_schema_1.verifyUserOTPSchema), User_controller_1.verifyUserByOTP, rateLimit_1.apiLimiter);
    router.get("/api/:symbol", StockPriceController_1.getStockPrice, rateLimit_1.apiLimiter);
};
exports.UserRoutes = UserRoutes;
