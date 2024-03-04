"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(require("../../../categories/entities/Category"));
const Transaction_1 = __importDefault(require("../Transaction"));
describe('Transaction entity', () => {
    it('should create entity correctly', () => {
        const payload = {
            id: 1,
            type: 'INCOME',
            description: 'Salary',
            categoryId: 1,
            ownerId: 1,
            amount: 1,
            category: new Category_1.default({
                id: 1,
                name: 'Salary',
                ownerId: 1,
                type: 'INCOME',
            }),
            createdBy: 'John',
            createdAt: new Date().toISOString(),
            date: new Date().toISOString(),
        };
        const entity = new Transaction_1.default(payload);
        expect(entity.amount).toEqual(payload.amount);
        expect(entity.category.id).toEqual(payload.category.id);
        expect(entity.category.name).toEqual(payload.category.name);
        expect(entity.category.ownerId).toEqual(payload.category.ownerId);
        expect(entity.category.type).toEqual(payload.category.type);
        expect(entity.categoryId).toEqual(payload.categoryId);
        expect(entity.createdAt).toEqual(payload.createdAt);
        expect(entity.createdBy).toEqual(payload.createdBy);
        expect(entity.date).toEqual(payload.date);
        expect(entity.description).toEqual(payload.description);
        expect(entity.id).toEqual(payload.id);
        expect(entity.ownerId).toEqual(payload.ownerId);
        expect(entity.type).toEqual(payload.type);
    });
});
