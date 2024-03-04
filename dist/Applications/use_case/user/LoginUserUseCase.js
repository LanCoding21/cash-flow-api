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
const NewAuth_1 = __importDefault(require("../../../Domains/auth/entities/NewAuth"));
const LoginUser_1 = __importDefault(require("../../../Domains/users/entities/LoginUser"));
class LoginUserUseCase {
    constructor(payload) {
        this.userRepository = payload.userRepository;
        this.passwordHash = payload.passwordHash;
        this.authRepository = payload.authRepository;
        this.tokenManager = payload.tokenManager;
    }
    execute(useCasePayload) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginUser = new LoginUser_1.default(useCasePayload);
            const user = yield this.userRepository.getUserByEmail(loginUser.email);
            yield this.passwordHash.comparePassword(loginUser.password, user.password);
            const payload = { user_id: user.id };
            const accessToken = this.tokenManager.createAccessToken(payload);
            const refreshToken = this.tokenManager.createRefreshToken(payload);
            yield this.authRepository.addToken(refreshToken);
            return new NewAuth_1.default({ accessToken, refreshToken });
        });
    }
}
exports.default = LoginUserUseCase;
