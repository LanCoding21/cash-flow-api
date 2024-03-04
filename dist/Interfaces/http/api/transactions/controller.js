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
exports.getSummarizeDailyTransaction = exports.deleteTransaction = exports.updateTransaction = exports.getTransactionById = exports.getUserTransactions = exports.createTransactions = void 0;
const container_1 = __importDefault(require("../../../../Infrastructures/container"));
const AddTransactionUseCase_1 = __importDefault(require("../../../../Applications/use_case/transaction/AddTransactionUseCase"));
const GetUserByIdUseCase_1 = __importDefault(require("../../../../Applications/use_case/user/GetUserByIdUseCase"));
const GetAllTransactionUseCase_1 = __importDefault(require("../../../../Applications/use_case/transaction/GetAllTransactionUseCase"));
const GetTransactionByIdUseCase_1 = __importDefault(require("../../../../Applications/use_case/transaction/GetTransactionByIdUseCase"));
const UpdateTransactionUseCase_1 = __importDefault(require("../../../../Applications/use_case/transaction/UpdateTransactionUseCase"));
const DeleteTransactionUseCase_1 = __importDefault(require("../../../../Applications/use_case/transaction/DeleteTransactionUseCase"));
const GetSummarizeDailyTransactionUseCase_1 = __importDefault(require("../../../../Applications/use_case/transaction/GetSummarizeDailyTransactionUseCase"));
const GetTransactionCountUseCase_1 = __importDefault(require("../../../../Applications/use_case/transaction/GetTransactionCountUseCase"));
function createTransactions(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const useCase = container_1.default.getInstance(AddTransactionUseCase_1.default.name);
            const getUserUseCase = container_1.default.getInstance(GetUserByIdUseCase_1.default.name);
            const user = yield getUserUseCase.execute(req.user_id);
            const transactionId = yield useCase.execute(Object.assign(Object.assign({}, req.body), { ownerId: req.user_id, createdBy: user.fullName, receiptFile: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename }));
            return res.status(201).json({
                message: 'Transaction created successfully!',
                data: { transactionId },
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.createTransactions = createTransactions;
function getUserTransactions(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const useCase = container_1.default.getInstance(GetAllTransactionUseCase_1.default.name);
            const getCountUseCase = container_1.default.getInstance(GetTransactionCountUseCase_1.default.name);
            const { date, searchText, categoryId, type, limit, offset } = req.query;
            const payload = {
                ownerId: req.user_id,
                categoryId: categoryId ? +categoryId : undefined,
                date: date,
                searchText: searchText,
                type: type,
                limit: limit ? +limit : undefined,
                offset: offset ? +offset : undefined,
            };
            const transactions = yield useCase.execute(payload);
            const totalItems = yield getCountUseCase.execute(payload);
            return res.json({
                message: 'Success get transactions',
                data: transactions,
                page: {
                    totalItems,
                },
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getUserTransactions = getUserTransactions;
function getTransactionById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const useCase = container_1.default.getInstance(GetTransactionByIdUseCase_1.default.name);
            const transaction = yield useCase.execute(+req.params.id, req.user_id);
            return res.json({
                message: 'Success get transaction',
                data: transaction,
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getTransactionById = getTransactionById;
function updateTransaction(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const useCase = container_1.default.getInstance(UpdateTransactionUseCase_1.default.name);
            const getUserUseCase = container_1.default.getInstance(GetUserByIdUseCase_1.default.name);
            const user = yield getUserUseCase.execute(req.user_id);
            yield useCase.execute(+req.params.id, user.id, Object.assign(Object.assign({}, req.body), { ownerId: req.user_id, createdBy: user.fullName, receiptFile: (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename }));
            return res.status(200).json({
                message: 'Transaction updated successfully!',
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.updateTransaction = updateTransaction;
function deleteTransaction(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const useCase = container_1.default.getInstance(DeleteTransactionUseCase_1.default.name);
            yield useCase.execute(+req.params.id, req.user_id);
            return res.json({ message: 'Transaction deleted successfully!' });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.deleteTransaction = deleteTransaction;
function getSummarizeDailyTransaction(req, res, next) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const useCase = container_1.default.getInstance(GetSummarizeDailyTransactionUseCase_1.default.name);
            const dateStart = (_b = (_a = req.query.dateStart) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '';
            const dateEnd = (_d = (_c = req.query.dateEnd) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '';
            const transactions = yield useCase.execute({
                dateStart,
                dateEnd,
                ownerId: req.user_id,
            });
            return res.json({
                message: 'Success get summarize daily transactions',
                data: { transactions },
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getSummarizeDailyTransaction = getSummarizeDailyTransaction;
