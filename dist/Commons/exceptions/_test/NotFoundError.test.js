"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientError_1 = __importDefault(require("../ClientError"));
const NotFoundError_1 = __importDefault(require("../NotFoundError"));
describe('NotFoundError', () => {
    it('should create NotFoundError correctly', () => {
        const err = new NotFoundError_1.default('Not found');
        expect(err).toBeInstanceOf(NotFoundError_1.default);
        expect(err).toBeInstanceOf(ClientError_1.default);
        expect(err).toBeInstanceOf(Error);
        expect(err.name).toBe('NotFoundError');
        expect(err.statusCode).toBe(404);
        expect(err.message).toBe('Not found');
    });
});
