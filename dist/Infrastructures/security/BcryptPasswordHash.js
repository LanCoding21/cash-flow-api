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
const bcrypt_1 = require("bcrypt");
const PasswordHash_1 = __importDefault(require("../../Applications/security/PasswordHash"));
const InvariantError_1 = __importDefault(require("../../Commons/exceptions/InvariantError"));
class BcryptPasswordHash extends PasswordHash_1.default {
    constructor(saltOrRounds = 10) {
        super();
        this.saltOrRounds = saltOrRounds;
    }
    hash(password) {
        return (0, bcrypt_1.hash)(password, this.saltOrRounds);
    }
    comparePassword(plain, encrypted) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, bcrypt_1.compare)(plain, encrypted);
            if (!result)
                throw new InvariantError_1.default('Password not match');
        });
    }
}
exports.default = BcryptPasswordHash;
