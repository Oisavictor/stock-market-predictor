"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mail = void 0;
const config = require("config");
const nodemailer_1 = require("nodemailer");
const host = config.get('mailgun.HOST');
const port = config.get('mailgun.PORT');
const secure = config.get('mailgun.SECURE');
const user = config.get('mailgun.USER');
const pass = config.get('mailgun.PASS');
exports.mail = (0, nodemailer_1.createTransport)({
    host: host,
    port: port,
    secure: false,
    auth: {
        user: user,
        pass: pass
    }
});
