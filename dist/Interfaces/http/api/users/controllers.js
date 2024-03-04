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
exports.fetchMe = exports.addUser = void 0;
const AddUserUseCase_1 = __importDefault(require("../../../../Applications/use_case/user/AddUserUseCase"));
const container_1 = __importDefault(require("../../../../Infrastructures/container"));
const GetUserByIdUseCase_1 = __importDefault(require("../../../../Applications/use_case/user/GetUserByIdUseCase"));
function addUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const addUserUseCase = container_1.default.getInstance(AddUserUseCase_1.default.name);
            yield addUserUseCase.execute(req.body);
            res.status(201).json({ message: 'Register success' });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.addUser = addUser;
function fetchMe(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getUserByIdUseCase = container_1.default.getInstance(GetUserByIdUseCase_1.default.name);
            const user = yield getUserByIdUseCase.execute(req.user_id);
            return res
                .status(200)
                .json({ message: 'Success get user', data: { user } });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.fetchMe = fetchMe;
