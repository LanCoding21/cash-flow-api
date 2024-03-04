"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        if (this.constructor.name === 'ClientError') {
            throw new Error('cannot instantiate abstract class');
        }
        this.statusCode = statusCode;
        this.name = 'ClientError';
    }
}
exports.default = ClientError;
