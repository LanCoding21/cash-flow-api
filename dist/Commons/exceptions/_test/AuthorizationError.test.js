"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthorizationError_1 = __importDefault(require("../AuthorizationError"));
const ClientError_1 = __importDefault(require("../ClientError"));
describe('AuthorizationError', () => {
    it('should create AuthorizationError correctly', () => {
        const err = new AuthorizationError_1.default('Not permit');
        expect(err).toBeInstanceOf(AuthorizationError_1.default);
        expect(err).toBeInstanceOf(ClientError_1.default);
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('Not permit');
        expect(err.name).toBe('AuthorizationError');
        expect(err.statusCode).toBe(403);
    });
});
