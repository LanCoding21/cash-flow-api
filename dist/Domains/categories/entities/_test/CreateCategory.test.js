"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateCategory_1 = __importDefault(require("../CreateCategory"));
describe('CreateCategory entities', () => {
    it('should throw error when category type is not valid', () => {
        const payload = {
            name: 'Category',
            type: 'INVALID',
            ownerId: 1,
        };
        expect(() => new CreateCategory_1.default(payload)).toThrow('CREATE_CATEGORY.TYPE_IS_INVALID');
    });
    it('should create entities correctly when category type is valid', () => {
        const payload = {
            name: 'Category',
            type: 'INCOME',
            ownerId: 1,
        };
        const createCategory = new CreateCategory_1.default(payload);
        expect(createCategory.name).toEqual(payload.name);
        expect(createCategory.type).toEqual(payload.type);
        expect(createCategory.ownerId).toEqual(payload.ownerId);
    });
    it('should create entities correctly when category type is valid', () => {
        const payload = {
            name: 'Category',
            type: 'EXPENSE',
            ownerId: 1,
        };
        const createCategory = new CreateCategory_1.default(payload);
        expect(createCategory.name).toEqual(payload.name);
        expect(createCategory.type).toEqual(payload.type);
        expect(createCategory.ownerId).toEqual(payload.ownerId);
    });
});
