"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.jwtSign = void 0;
const jwt = require("jsonwebtoken");
const config = require("config");
const accessToken = config.get('token.ACCESS_TOKEN');
const jwtSign = (data) => {
    return jwt.sign({ token: data }, accessToken, { expiresIn: '2h' });
};
exports.jwtSign = jwtSign;
const verifyToken = (token) => {
    return jwt.verify(token, accessToken);
};
exports.verifyToken = verifyToken;
