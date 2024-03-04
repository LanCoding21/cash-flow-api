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
const CategoryRepository_1 = __importDefault(require("../../Domains/categories/CategoryRepository"));
const Category_1 = __importDefault(require("../../Domains/categories/entities/Category"));
const NotFoundError_1 = __importDefault(require("../../Commons/exceptions/NotFoundError"));
const AuthorizationError_1 = __importDefault(require("../../Commons/exceptions/AuthorizationError"));
class CategoryRepositoryPrisma extends CategoryRepository_1.default {
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    getAll(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, offset, type, ownerId, searchText } = payload;
            const params = [{ status: 1 }];
            const orParams = [];
            if (type) {
                params.push({ type });
            }
            if (ownerId) {
                params.push({ ownerId });
            }
            if (searchText) {
                orParams.push({
                    name: {
                        contains: searchText.toLowerCase(),
                        mode: 'insensitive',
                    },
                });
            }
            const skip = offset && limit ? (offset - 1) * limit : undefined;
            const result = yield this.prisma.category.findMany({
                take: limit,
                skip,
                where: {
                    AND: params,
                    OR: searchText ? orParams : undefined,
                },
            });
            return result.map((res) => new Category_1.default(res));
        });
    }
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const curr = yield this.prisma.category.findFirst({ where: { id } });
            if (!curr)
                throw new NotFoundError_1.default('Category not found');
            return new Category_1.default(curr);
        });
    }
    createCategory(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const curr = yield this.prisma.category.create({
                data: {
                    name: payload.name,
                    type: payload.type,
                    ownerId: payload.ownerId,
                },
            });
            return curr.id;
        });
    }
    updateCategory(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.category.update({
                where: { id },
                data: {
                    name: payload.name,
                    type: payload.type,
                },
            });
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.category.update({
                where: { id },
                data: {
                    status: 0,
                },
            });
        });
    }
    verifyCategoryAvailability(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const curr = yield this.prisma.category.findFirst({ where: { id } });
            if (!curr)
                throw new NotFoundError_1.default('Category not found');
        });
    }
    verifyCategoryOwner(id, owner_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const curr = yield this.prisma.category.findFirst({ where: { id } });
            if (curr.ownerId !== owner_id) {
                throw new AuthorizationError_1.default('Not permitted');
            }
        });
    }
    getCategoryCount(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, offset, type, ownerId, searchText } = payload;
            const params = [{ status: 1 }];
            const orParams = [];
            if (type) {
                params.push({ type });
            }
            if (ownerId) {
                params.push({ ownerId });
            }
            if (searchText) {
                orParams.push({
                    name: {
                        contains: searchText.toLowerCase(),
                        mode: 'insensitive',
                    },
                });
            }
            const result = yield this.prisma.category.count({
                take: limit,
                skip: offset,
                where: {
                    AND: params,
                    OR: searchText ? orParams : undefined,
                },
            });
            return result;
        });
    }
}
exports.default = CategoryRepositoryPrisma;
