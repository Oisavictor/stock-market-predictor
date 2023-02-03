"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const User_controller_1 = require("../controller/User.controller");
const StockPriceController_1 = require("../controller/StockPriceController");
const Routes = (router) => {
    router.get("/healthCheck", (req, res, next) => {
        res.sendStatus(200);
        next();
    });
    router.get("/:stockSymbol", StockPriceController_1.getStockPrice);
    router.post("/", StockPriceController_1.predictStockPrice);
    router.get("/", StockPriceController_1.landingPage);
    //User testing route
    router.post('/user', User_controller_1.createUserController);
};
exports.Routes = Routes;
