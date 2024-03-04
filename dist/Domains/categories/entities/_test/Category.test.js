"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(require("../Category"));
describe('Category entities', () => {
    it('should throw error when category type is not valid', () => {
        const payload = {
            id: 1,
            name: 'Category',
            type: 'INVALID CATEGORY',
            ownerId: 1,
        };
        expect(() => new Category_1.default(payload)).toThrow('CATEGORY.TYPE_IS_INVALID');
    });
    it('should create Category entities correctly', () => {
        const payload = {
            id: 1,
            name: 'Category',
            type: 'INCOME',
            ownerId: 1,
        };
        const category = new Category_1.default(payload);
        expect(category.id).toEqual(payload.id);
        expect(category.name).toEqual(payload.name);
        expect(category.type).toEqual(payload.type);
        expect(category.ownerId).toEqual(payload.ownerId);
    });
    it('should create Category entities correctly', () => {
        const payload = {
            id: 1,
            name: 'Category',
            type: 'EXPENSE',
            ownerId: 1,
        };
        const category = new Category_1.default(payload);
        expect(category.id).toEqual(payload.id);
        expect(category.name).toEqual(payload.name);
        expect(category.type).toEqual(payload.type);
        expect(category.ownerId).toEqual(payload.ownerId);
    });
});
