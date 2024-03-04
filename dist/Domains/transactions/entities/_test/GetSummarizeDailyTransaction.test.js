"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GetSummarizeDailyTransaction_1 = __importDefault(require("../GetSummarizeDailyTransaction"));
describe('GetSummarizeDailyTransaction', () => {
    it('should create entity correctly', () => {
        const payload = {
            dateStart: new Date().toISOString(),
            dateEnd: new Date().toISOString(),
            ownerId: 1,
        };
        const entity = new GetSummarizeDailyTransaction_1.default(payload);
        expect(entity.dateEnd).toEqual(payload.dateEnd);
        expect(entity.dateStart).toEqual(payload.dateStart);
        expect(entity.ownerId).toEqual(payload.ownerId);
    });
});
