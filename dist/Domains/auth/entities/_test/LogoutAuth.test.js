"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogoutAuth_1 = __importDefault(require("../LogoutAuth"));
describe('LogoutAuth entities', () => {
    it('should create LogoutAuth entities correctly', () => {
        const payload = {
            refreshToken: 'token',
        };
        const logoutAuth = new LogoutAuth_1.default(payload);
        expect(logoutAuth.refreshToken).toEqual(payload.refreshToken);
    });
});
