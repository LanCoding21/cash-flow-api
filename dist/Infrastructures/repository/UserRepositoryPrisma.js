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
const UserRepository_1 = __importDefault(require("../../Domains/users/UserRepository"));
const User_1 = __importDefault(require("../../Domains/users/entities/User"));
const NotFoundError_1 = __importDefault(require("../../Commons/exceptions/NotFoundError"));
const InvariantError_1 = __importDefault(require("../../Commons/exceptions/InvariantError"));
class UserRepositoryPrisma extends UserRepository_1.default {
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    addUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.user.create({
                data: {
                    email: payload.email,
                    fullName: payload.fullName,
                    password: payload.password,
                },
            });
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findFirst({ where: { email } });
            if (!user)
                throw new NotFoundError_1.default('User not found');
            return new User_1.default(user);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findFirst({ where: { id } });
            if (!user)
                throw new NotFoundError_1.default('User not found');
            return new User_1.default(user);
        });
    }
    verifyAvailableEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findFirst({ where: { email } });
            if (user)
                throw new InvariantError_1.default('Email has been taken');
        });
    }
}
exports.default = UserRepositoryPrisma;
