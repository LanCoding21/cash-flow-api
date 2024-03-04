"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LogoutAuth {
    constructor(payload) {
        this.verifyPayload(payload);
        this.refreshToken = payload.refreshToken;
    }
    verifyPayload(payload) {
        const { refreshToken } = payload;
        if (!refreshToken) {
            throw new Error('LOGOUT_AUTH.NOT_CONTAIN_NEEDED_PROPERTY');
        }
        if (typeof refreshToken !== 'string') {
            throw new Error('LOGOUT_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}
exports.default = LogoutAuth;
