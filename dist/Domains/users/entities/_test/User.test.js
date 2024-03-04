"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../User"));
describe('User entities', () => {
    it('should throw error if email not valid', () => {
        const payload = {
            id: 1,
            fullName: 'John',
            email: 'john',
            password: 'password',
        };
        expect(() => new User_1.default(payload)).toThrow('USER.EMAIL_NOT_VALID');
    });
    it('should create user entity correctly', () => {
        const payload = {
            fullName: 'John',
            id: 1,
            email: 'john@mail.com',
            password: 'Supersecretpassword',
        };
        const user = new User_1.default(payload);
        expect(user.fullName).toEqual(payload.fullName);
        expect(user.id).toEqual(payload.id);
        expect(user.email).toEqual(payload.email);
        expect(user.password).toEqual(payload.password);
    });
});
