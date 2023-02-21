"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = require("pino");
const pino_pretty_1 = require("pino-pretty");
//Still working on this
const stream = (0, pino_pretty_1.default)({
    colorize: true,
});
exports.logger = (0, pino_1.default)({ level: 'info' }, stream);
