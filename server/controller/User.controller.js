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
exports.verifyUserByOTP = exports.createUserController = void 0;
const user_service_1 = require("../services/user.service");
const http_status_codes_1 = require("http-status-codes");
const createUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_service_1.createUser)(req.body);
    console.log(user);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(Object.assign({}, user));
});
exports.createUserController = createUserController;
const verifyUserByOTP = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_service_1.VerifyUser)(req.body);
    return res.status(http_status_codes_1.StatusCodes.OK).json(Object.assign({}, user));
});
exports.verifyUserByOTP = verifyUserByOTP;
