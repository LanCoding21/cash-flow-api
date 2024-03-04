"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_1 = __importDefault(require("../middleware/validator"));
const validation_1 = require("./validation");
const controllers_1 = require("./controllers");
const auth_1 = __importDefault(require("../middleware/auth"));
const userRouter = (0, express_1.Router)();
userRouter.post('/', (0, validator_1.default)(validation_1.addUserSchema), controllers_1.addUser);
userRouter.get('/me', (0, auth_1.default)(), controllers_1.fetchMe);
exports.default = userRouter;
