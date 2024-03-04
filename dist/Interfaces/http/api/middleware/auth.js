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
const AuthorizationError_1 = __importDefault(require("../../../../Commons/exceptions/AuthorizationError"));
const container_1 = __importDefault(require("../../../../Infrastructures/container"));
const TokenManager_1 = __importDefault(require("../../../../Applications/security/TokenManager"));
const AuthenticationError_1 = __importDefault(require("../../../../Commons/exceptions/AuthenticationError"));
function auth() {
    const callback = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(new AuthorizationError_1.default('Unauthorized'));
        }
        const token = authorizationHeader.split('Bearer ')[1];
        if (!token) {
            return next(new AuthorizationError_1.default('Unauthorized'));
        }
        try {
            const tokenManager = container_1.default.getInstance(TokenManager_1.default.name);
            tokenManager.verifyAccessToken(token);
            const decoded = tokenManager.decodePayload(token);
            req.user_id = decoded.user_id;
        }
        catch (error) {
            return next(new AuthenticationError_1.default('Invalid token'));
        }
        return next();
    });
    return callback;
}
exports.default = auth;
