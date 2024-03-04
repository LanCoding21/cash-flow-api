"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SummarizeDailyTransaction_1 = __importDefault(require("../SummarizeDailyTransaction"));
describe('SummarizeDailyTransaction entity', () => {
    it('should create entity correctly', () => {
        const payload = {
            date: new Date().toISOString(),
            type: 'INCOME',
            amount: 1,
            category: 'Salary',
        };
        const entity = new SummarizeDailyTransaction_1.default(payload);
        expect(entity.amount).toEqual(payload.amount);
        expect(entity.category).toEqual(payload.category);
        expect(entity.date).toEqual(payload.date);
        expect(entity.type).toEqual(payload.type);
    });
});
