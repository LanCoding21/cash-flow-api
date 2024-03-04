"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("../UserRepository"));
const RegisterUser_1 = __importDefault(require("../entities/RegisterUser"));
describe('UserRepository', () => {
    const userRepository = new UserRepository_1.default();
    describe('UserRepository.verifyAvailableEmail', () => {
        it('should throw error when invoke abstract method', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(userRepository.verifyAvailableEmail('john@mail.com')).rejects.toThrow('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        }));
    });
    describe('UserRepository.addUser', () => {
        it('should throw error when invoke abstract method', () => __awaiter(void 0, void 0, void 0, function* () {
            const registerUser = new RegisterUser_1.default({
                email: 'john@doe.com',
                fullName: 'John',
                password: 'password',
            });
            yield expect(userRepository.addUser(registerUser)).rejects.toThrow('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        }));
    });
    describe('UserRepository.getUserById', () => {
        it('should throw error when invoke abstract method', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(userRepository.getUserById(1)).rejects.toThrow('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        }));
    });
    describe('UserRepository.getUserByEmail', () => {
        it('should throw error when invoke abstract method', () => __awaiter(void 0, void 0, void 0, function* () {
            yield expect(userRepository.getUserByEmail('john@doe.com')).rejects.toThrow('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        }));
    });
});
