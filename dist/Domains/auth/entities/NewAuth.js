"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NewAuth {
    constructor(payload) {
        this.verifyPayload(payload);
        this.accessToken = payload.accessToken;
        this.refreshToken = payload.refreshToken;
    }
    verifyPayload(payload) {
        const { accessToken, refreshToken } = payload;
        if (!accessToken || !refreshToken) {
            throw new Error('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY');
        }
        if (typeof accessToken !== 'string' || typeof refreshToken !== 'string') {
            throw new Error('NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}
exports.default = NewAuth;
