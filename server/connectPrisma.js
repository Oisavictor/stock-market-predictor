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
exports.connectPrisma = void 0;
const user_interface_1 = require("./Interface/user.interface");
const logger_1 = require("./middleware/logger");
const connectPrisma = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_interface_1.prisma.$connect().then(() => {
            logger_1.logger.info('Database is connected Successfully');
        }).catch((err) => {
            logger_1.logger.error(`Reasons why Database fails to connect: ${err.message}`);
            user_interface_1.prisma.$disconnect();
        });
    }
    catch (error) {
        if (error)
            setTimeout(() => {
                logger_1.logger.error(`${error.message} trying to reconnect`);
                user_interface_1.prisma.$connect();
            }, 5);
    }
});
exports.connectPrisma = connectPrisma;
