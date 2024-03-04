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
const TransactionRepository_1 = __importDefault(require("../../Domains/transactions/TransactionRepository"));
const NotFoundError_1 = __importDefault(require("../../Commons/exceptions/NotFoundError"));
const AuthorizationError_1 = __importDefault(require("../../Commons/exceptions/AuthorizationError"));
const Transaction_1 = __importDefault(require("../../Domains/transactions/entities/Transaction"));
const Category_1 = __importDefault(require("../../Domains/categories/entities/Category"));
const SummarizeDailyTransaction_1 = __importDefault(require("../../Domains/transactions/entities/SummarizeDailyTransaction"));
class TransactionRepositoryPrisma extends TransactionRepository_1.default {
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    getTransactionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const curr = yield this.prisma.transactions.findFirst({
                where: { id, status: 1 },
                include: {
                    category: true,
                },
            });
            const category = new Category_1.default({
                id: curr.category.id,
                name: curr.category.name,
                ownerId: curr.category.ownerId,
                type: curr.category.type,
            });
            return new Transaction_1.default(Object.assign(Object.assign({}, curr), { category, receiptFile: curr === null || curr === void 0 ? void 0 : curr.receiptFile, createdAt: curr.createdAt.toISOString(), date: curr.date.toISOString() }));
        });
    }
    getAllTransaction(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line operator-linebreak
            const { limit, offset, type, ownerId, date, categoryId, searchText } = payload;
            const params = [{ status: 1 }];
            if (type) {
                params.push({ type });
            }
            if (ownerId) {
                params.push({ ownerId });
            }
            if (date) {
                params.push({
                    date: {
                        equals: new Date(date),
                    },
                });
            }
            if (categoryId) {
                params.push({ categoryId });
            }
            if (searchText) {
                params.push({
                    description: {
                        contains: searchText,
                        mode: 'insensitive',
                    },
                });
            }
            const skip = offset && limit ? (offset - 1) * limit : undefined;
            const result = yield this.prisma.transactions.findMany({
                take: limit,
                skip,
                include: {
                    category: true,
                },
                where: {
                    AND: params,
                },
                orderBy: {
                    date: 'desc',
                },
            });
            return result.map((curr) => {
                const category = new Category_1.default({
                    id: curr.category.id,
                    name: curr.category.name,
                    ownerId: curr.category.ownerId,
                    type: curr.category.type,
                });
                return new Transaction_1.default(Object.assign(Object.assign({}, curr), { category, receiptFile: curr === null || curr === void 0 ? void 0 : curr.receiptFile, createdAt: curr.createdAt.toISOString(), date: curr.date.toISOString() }));
            });
        });
    }
    createTransaction(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const curr = yield this.prisma.transactions.create({
                data: {
                    amount: payload.amount,
                    createdBy: payload.createdBy,
                    date: payload.date,
                    description: payload.description,
                    type: payload.type,
                    categoryId: payload.categoryId,
                    ownerId: payload.ownerId,
                    receiptFile: payload.receiptFile,
                },
            });
            return curr.id;
        });
    }
    deleteTransaction(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.transactions.update({
                where: { id },
                data: {
                    status: 0,
                },
            });
        });
    }
    updateTransaction(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.transactions.update({
                where: { id },
                data: {
                    amount: payload.amount,
                    createdBy: payload.createdBy,
                    date: payload.date,
                    description: payload.description,
                    type: payload.type,
                    categoryId: payload.categoryId,
                    ownerId: payload.ownerId,
                    receiptFile: payload.receiptFile,
                },
            });
        });
    }
    verifyTransactionAvailability(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const curr = yield this.prisma.transactions.findFirst({
                where: { id, status: 1 },
            });
            if (!curr)
                throw new NotFoundError_1.default('Transaction not found');
        });
    }
    verifyTransactionOwner(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const curr = yield this.prisma.transactions.findFirst({ where: { id } });
            if (curr.ownerId !== userId)
                throw new AuthorizationError_1.default('Not permitted');
        });
    }
    summarizeDailyTransaction(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const dailyGroup = yield this.prisma.transactions.groupBy({
                by: ['date', 'type', 'categoryId'],
                _sum: {
                    amount: true,
                },
                where: {
                    ownerId: payload.ownerId,
                    date: {
                        gte: new Date(payload.dateStart),
                        lte: new Date(payload.dateEnd),
                    },
                    status: 1,
                },
            });
            const categoryIds = dailyGroup.map((dg) => dg.categoryId);
            const categories = yield this.prisma.category.findMany({
                where: {
                    id: {
                        in: categoryIds,
                    },
                },
            });
            return dailyGroup.map((res) => {
                var _a;
                // eslint-disable-next-line implicit-arrow-linebreak
                return new SummarizeDailyTransaction_1.default({
                    // eslint-disable-next-line no-underscore-dangle
                    amount: (_a = res._sum.amount) !== null && _a !== void 0 ? _a : 0,
                    date: res.date.toISOString(),
                    type: res.type,
                    category: categories.filter((c) => c.id === res.categoryId)[0].name,
                });
            });
        });
    }
    getTransactionCount(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type, ownerId, date, categoryId, searchText } = payload;
            const params = [{ status: 1 }];
            if (type) {
                params.push({ type });
            }
            if (ownerId) {
                params.push({ ownerId });
            }
            if (date) {
                params.push({ date: new Date(date) });
            }
            if (categoryId) {
                params.push({ categoryId });
            }
            if (searchText) {
                params.push({
                    description: {
                        contains: searchText,
                        mode: 'insensitive',
                    },
                });
            }
            const result = yield this.prisma.transactions.count({
                where: {
                    AND: params,
                },
            });
            return result;
        });
    }
}
exports.default = TransactionRepositoryPrisma;
