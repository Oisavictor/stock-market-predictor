"use strict";
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
//Express connection  
const ExpressConnection = () => {
    const PORT = config.get('PORT');
    const app = express();
    app.use(express.json());
    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
    }));
    // app.use('/', router);
    (0, route_1.Routes)(app);
    app.listen(PORT, () => {
        logger_1.logger.info(`app is been listen to on http://localhost:${PORT}`);
    });
};
exports.ExpressConnection = ExpressConnection;
(0, exports.ExpressConnection)();
