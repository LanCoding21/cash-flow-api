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
const AuthRepository_1 = __importDefault(require("../../Domains/auth/AuthRepository"));
const NotFoundError_1 = __importDefault(require("../../Commons/exceptions/NotFoundError"));
const AuthToken_1 = __importDefault(require("../../Domains/auth/entities/AuthToken"));
class AuthRepositoryPrisma extends AuthRepository_1.default {
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    addToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.authentication.create({ data: { token } });
        });
    }
    checkAvailabilityToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const curr = yield this.prisma.authentication.findFirst({
                where: {
                    token,
                },
            });
            if (!curr)
                throw new NotFoundError_1.default('Refresh token not found');
        });
    }
    deleteToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.authentication.delete({
                where: { id: undefined, token },
            });
        });
    }
    deleteTokenById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.authentication.delete({
                where: { id },
            });
        });
    }
    getToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const curr = yield this.prisma.authentication.findFirst({
                where: { token },
            });
            return new AuthToken_1.default(curr);
        });
    }
}
exports.default = AuthRepositoryPrisma;
