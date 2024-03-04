"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthToken {
    constructor(payload) {
        this.verifyPayload(payload);
        this.id = payload.id;
        this.token = payload.token;
    }
    verifyPayload(payload) {
        const { id, token } = payload;
        if (!id || !token) {
            throw new Error('AUTH_TOKEN.NOT_CONTAIN_NEEDED_PROPERTY');
        }
        if (typeof id !== 'number' || typeof token !== 'string') {
            throw new Error('AUTH_TOKEN.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}
exports.default = AuthToken;
