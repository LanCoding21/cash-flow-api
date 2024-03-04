"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientError_1 = __importDefault(require("../ClientError"));
const InvariantError_1 = __importDefault(require("../InvariantError"));
describe('InvariantError', () => {
    it('should create InvariantError correctly', () => {
        const err = new InvariantError_1.default('Error');
        expect(err).toBeInstanceOf(InvariantError_1.default);
        expect(err).toBeInstanceOf(ClientError_1.default);
        expect(err).toBeInstanceOf(Error);
        expect(err.name).toBe('InvariantError');
        expect(err.message).toBe('Error');
        expect(err.statusCode).toBe(400);
    });
});
