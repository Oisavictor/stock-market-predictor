"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const Routes = (router) => {
    router.get("/healthCheck", (req, res, next) => {
        res.sendStatus(200);
        next();
    });
    router.get('/', (req, res) => {
        res.send("stock_market_predict test");
    });
};
exports.Routes = Routes;
