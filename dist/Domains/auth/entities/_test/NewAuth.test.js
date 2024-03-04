"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NewAuth_1 = __importDefault(require("../NewAuth"));
describe('NewAuth entities', () => {
    it('should create NewAuth entities correctly', () => {
        const payload = {
            accessToken: 'accessToken',
            refreshToken: 'refreshToken',
        };
        const newAuth = new NewAuth_1.default(payload);
        expect(newAuth.accessToken).toEqual(payload.accessToken);
        expect(newAuth.refreshToken).toEqual(payload.refreshToken);
    });
});
