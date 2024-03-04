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
Object.defineProperty(exports, "__esModule", { value: true });
class UserRepository {
    verifyAvailableEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        });
    }
    addUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        });
    }
}
exports.default = UserRepository;
