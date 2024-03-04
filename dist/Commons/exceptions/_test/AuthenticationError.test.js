"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationError_1 = __importDefault(require("../AuthenticationError"));
const ClientError_1 = __importDefault(require("../ClientError"));
describe('AuthenticationError', () => {
    it('should create AuthenticationError correctly', () => {
        const authError = new AuthenticationError_1.default('Invalid token');
        expect(authError).toBeInstanceOf(AuthenticationError_1.default);
        expect(authError).toBeInstanceOf(ClientError_1.default);
        expect(authError).toBeInstanceOf(Error);
        expect(authError.message).toBe('Invalid token');
        expect(authError.name).toBe('AuthenticationError');
        expect(authError.statusCode).toBe(401);
    });
});
