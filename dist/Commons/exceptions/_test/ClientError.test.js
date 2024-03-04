"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientError_1 = __importDefault(require("../ClientError"));
describe('ClientError', () => {
    it('should throw error when instantiate abstract class', () => {
        expect(() => new ClientError_1.default('Error')).toThrow('cannot instantiate abstract class');
    });
});
