"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateTransaction_1 = __importDefault(require("../CreateTransaction"));
describe('CreateTransaction', () => {
    it('should throw error when amount is < 1', () => {
        const payload = {
            type: 'INCOME',
            description: 'Description',
            categoryId: 1,
            ownerId: 1,
            amount: 0,
            createdBy: 'JOHN',
            date: new Date().toISOString(),
        };
        expect(() => new CreateTransaction_1.default(payload)).toThrow('CREATE_TRANSACTION.AMOUNT_IS_INVALID');
    });
    it('should throw error when transaction type is invalid', () => {
        const payload = {
            type: 'INVALID',
            description: 'Description',
            categoryId: 1,
            ownerId: 1,
            amount: 1,
            createdBy: 'JOHN',
            date: new Date().toISOString(),
        };
        expect(() => new CreateTransaction_1.default(payload)).toThrow('CREATE_TRANSACTION.TYPE_IS_INVALID');
    });
    it('should create entities correctly', () => {
        const payload = {
            type: 'INCOME',
            description: 'Description',
            categoryId: 1,
            ownerId: 1,
            amount: 1,
            createdBy: 'JOHN',
            date: new Date().toISOString(),
        };
        const createTransaction = new CreateTransaction_1.default(payload);
        expect(createTransaction.amount).toEqual(payload.amount);
        expect(createTransaction.categoryId).toEqual(payload.categoryId);
        expect(createTransaction.createdBy).toEqual(payload.createdBy);
        expect(createTransaction.date).toEqual(payload.date);
        expect(createTransaction.description).toEqual(payload.description);
        expect(createTransaction.ownerId).toEqual(payload.ownerId);
        expect(createTransaction.type).toEqual(payload.type);
        expect(createTransaction.receiptFile).toBeFalsy();
    });
});
