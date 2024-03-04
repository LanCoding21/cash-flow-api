"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthToken_1 = __importDefault(require("../AuthToken"));
describe('AuthToken entities', () => {
    it('should create AuthToken entities correctly', () => {
        const payload = {
            id: 1,
            token: 'token',
        };
        const authToken = new AuthToken_1.default(payload);
        expect(authToken.id).toEqual(payload.id);
        expect(authToken.token).toEqual(payload.token);
    });
});
