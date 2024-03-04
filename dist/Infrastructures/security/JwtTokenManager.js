"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable class-methods-use-this */
const jwt = __importStar(require("jsonwebtoken"));
const TokenManager_1 = __importDefault(require("../../Applications/security/TokenManager"));
const AuthenticationError_1 = __importDefault(require("../../Commons/exceptions/AuthenticationError"));
class JwtTokenManager extends TokenManager_1.default {
    createAccessToken(payload) {
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
            expiresIn: '30s',
        });
        return token;
    }
    createRefreshToken(payload) {
        const token = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {});
        return token;
    }
    verifyAccessToken(token) {
        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        }
        catch (error) {
            throw new AuthenticationError_1.default('Token is invalid');
        }
    }
    verifyRefreshToken(token) {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
        }
        catch (error) {
            throw new AuthenticationError_1.default('Token is invalid');
        }
    }
    decodePayload(token) {
        const decoded = jwt.decode(token);
        return decoded;
    }
}
exports.default = JwtTokenManager;
