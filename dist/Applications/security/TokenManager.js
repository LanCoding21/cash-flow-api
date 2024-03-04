"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
class TokenManager {
    createRefreshToken(payload) {
        throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    }
    createAccessToken(payload) {
        throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    }
    verifyRefreshToken(token) {
        throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    }
    verifyAccessToken(token) {
        throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    }
    decodePayload(token) {
        throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    }
}
exports.default = TokenManager;
