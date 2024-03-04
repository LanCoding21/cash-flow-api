"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LoginUser_1 = __importDefault(require("../LoginUser"));
describe('LoginUser entities', () => {
    it('should throw error when password is < 8', () => {
        const payload = {
            email: 'test@test.com',
            password: '-',
        };
        expect(() => new LoginUser_1.default(payload)).toThrow('LOGIN_USER.PASSWORD_MINIMUM_CHARACTER');
    });
    it('should throw error when not supplied valid email', () => {
        const payload = {
            email: 'email',
            password: 'Supersecretpassword',
        };
        expect(() => new LoginUser_1.default(payload)).toThrow('LOGIN_USER.EMAIL_NOT_VALID');
    });
    it('should create login user entities correctly', () => {
        const payload = {
            email: 'john@doe.com',
            password: 'Supersecretpassword',
        };
        const loginUser = new LoginUser_1.default(payload);
        expect(payload.email).toEqual(loginUser.email);
        expect(payload.password).toEqual(loginUser.password);
    });
});
