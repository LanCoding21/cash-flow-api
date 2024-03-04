"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_1 = __importDefault(require("../middleware/validator"));
const validation_1 = require("./validation");
const controller_1 = require("./controller");
const auth_1 = __importDefault(require("../middleware/auth"));
const authRouter = (0, express_1.Router)();
authRouter.post('/session', (0, validator_1.default)(validation_1.logInSchema), controller_1.logIn);
authRouter.delete('/session', (0, auth_1.default)(), (0, validator_1.default)(validation_1.logOutSchema), controller_1.logOut);
authRouter.post('/session/refresh', (0, validator_1.default)(validation_1.refreshTokenSchema), controller_1.refreshToken);
exports.default = authRouter;
