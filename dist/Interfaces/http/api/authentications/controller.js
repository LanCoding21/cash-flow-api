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
exports.refreshToken = exports.logOut = exports.logIn = void 0;
const container_1 = __importDefault(require("../../../../Infrastructures/container"));
const LoginUserUseCase_1 = __importDefault(require("../../../../Applications/use_case/user/LoginUserUseCase"));
const LogoutUserUseCase_1 = __importDefault(require("../../../../Applications/use_case/user/LogoutUserUseCase"));
const RefreshAccessTokenUseCase_1 = __importDefault(require("../../../../Applications/use_case/authentication/RefreshAccessTokenUseCase"));
function logIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const loginUsecase = container_1.default.getInstance(LoginUserUseCase_1.default.name);
            const data = yield loginUsecase.execute(req.body);
            return res.status(201).json({ message: 'Login success', data });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.logIn = logIn;
function logOut(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const logoutUsecase = container_1.default.getInstance(LogoutUserUseCase_1.default.name);
            yield logoutUsecase.execute(req.body);
            return res.status(200).json({ message: 'Logout success' });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.logOut = logOut;
function refreshToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const useCase = container_1.default.getInstance(RefreshAccessTokenUseCase_1.default.name);
            const accessToken = yield useCase.execute(req.body.refreshToken);
            return res.status(201).json({
                message: 'Token refreshed successfully!',
                data: { accessToken },
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.refreshToken = refreshToken;
