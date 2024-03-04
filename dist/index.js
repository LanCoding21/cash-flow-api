"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./Infrastructures/http/server"));
dotenv_1.default.config();
(0, server_1.default)();
