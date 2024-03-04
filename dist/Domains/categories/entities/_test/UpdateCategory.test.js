"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UpdateCategory_1 = __importDefault(require("../UpdateCategory"));
describe('UpdateCategory entities', () => {
    it('should throw error when category type is invalid', () => {
        const payload = {
            name: 'Category',
            type: 'INVALID',
        };
        const updateCategory = new UpdateCategory_1.default(payload);
        expect(updateCategory.name).toEqual(payload.name);
        expect(updateCategory.type).toEqual(payload.type);
    });
});
