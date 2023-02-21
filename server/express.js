"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressConnection = void 0;
//All Dev dependency are called her
const express = require("express");
const cors = require("cors");
const config = require("config");
//Logger is called here
const logger_1 = require("./middleware/logger");
//All routes file is called here
const route_1 = require("./routes/route");
const user_routes_1 = require("./routes/user.routes");
//import prisma to connect automatically
const connectPrisma_1 = require("./connectPrisma");
//Express connection  
const ExpressConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    const PORT = config.get('PORT');
    const app = express();
    app.use(express.json());
    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
    }));
    // app.use('/', router);
    yield (0, connectPrisma_1.connectPrisma)();
    (0, route_1.Routes)(app);
    (0, user_routes_1.UserRoutes)(app);
    app.listen(PORT, () => {
        logger_1.logger.info(`app is been listen to on http://localhost:${PORT}`);
    });
});
exports.ExpressConnection = ExpressConnection;
(0, exports.ExpressConnection)();
