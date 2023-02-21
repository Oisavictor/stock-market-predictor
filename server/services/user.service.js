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
exports.LoginUser = exports.VerifyUser = exports.createUser = void 0;
const user_interface_1 = require("../interface/user.interface");
const errorMessage_1 = require("../utils/errorMessage");
const getRandomOTP_1 = require("../helper/getRandomOTP");
const hash_1 = require("../helper/hash");
const findUnique_1 = require("../helper/findUnique");
const http_status_codes_1 = require("http-status-codes");
const sendEmail_1 = require("../utils/sendEmail");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_interface_1.prisma.user.findUnique({
            where: { email: payload.email },
        });
        if (user) {
            return {
                ok: false,
                status: http_status_codes_1.StatusCodes.BAD_REQUEST,
                msg: errorMessage_1.default.DUPLICATE_EMAIL,
            };
        }
        const OTP = (0, getRandomOTP_1.generateOTP)(4);
        const SendEmail = yield (0, sendEmail_1.sendEmail)(payload.email, 'Verify', 'Veudsi', `<h1>Your verification Code is ${OTP}</h1>`);
        if (!SendEmail) {
            return {
                ok: false,
                status: http_status_codes_1.StatusCodes.REQUEST_TIMEOUT,
                msg: errorMessage_1.default.FAILED_EMAIL,
            };
        }
        let hashedOTP = yield (0, hash_1.hash)(OTP.toString());
        const confirmationCode = yield hashedOTP;
        payload.password = yield (0, hash_1.hash)(payload.password);
        payload.passwordConfirmation = payload.password;
        const createUser = yield user_interface_1.prisma.user.create({ data: Object.assign({ confirmationCode }, payload) });
        console.log(createUser);
        return createUser;
    }
    catch (error) {
        if (error)
            return { msg: error };
    }
});
exports.createUser = createUser;
const VerifyUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield user_interface_1.prisma.user.findUnique({
            where: { email: payload.email },
        });
        if (!findUser) {
            return {
                ok: false,
                status: http_status_codes_1.StatusCodes.NOT_FOUND,
                msg: errorMessage_1.default.USER_NOT_FOUND,
                result: findUser
            };
        }
        // decode the confirmation code
        const decode = yield (0, hash_1.CompareHashed)(payload.confirmationCode, findUser.confirmationCode);
        if (!decode) {
            return {
                ok: false,
                status: http_status_codes_1.StatusCodes.UNAUTHORIZED,
                msg: errorMessage_1.default.USER_NOT_FOUND,
            };
        }
        //update the confirmation code to be empty and isVerified to be true
        const verifyCode = yield user_interface_1.prisma.user.update({
            where: {
                email: payload.email,
            },
            data: {
                confirmationCode: '',
                isVerified: true
            },
        });
        return verifyCode;
    }
    catch (error) {
        if (error)
            return { msg: error };
    }
});
exports.VerifyUser = VerifyUser;
const LoginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield (0, findUnique_1.findUnique)(payload.email);
    if (!findUser) {
        return {
            ok: false,
            status: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            msg: errorMessage_1.default.USER_NOT_FOUND,
        };
    }
});
exports.LoginUser = LoginUser;
