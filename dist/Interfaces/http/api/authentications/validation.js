"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSchema = exports.logOutSchema = exports.logInSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.logInSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required().min(8),
});
exports.logOutSchema = joi_1.default.object({
    refreshToken: joi_1.default.string().required(),
});
exports.refreshTokenSchema = joi_1.default.object({
    refreshToken: joi_1.default.string().required(),
});
