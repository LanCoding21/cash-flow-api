"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionUpdateSchema = exports.transactionCreateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.transactionCreateSchema = joi_1.default.object({
    amount: joi_1.default.number().min(1).required(),
    date: joi_1.default.string().isoDate().required(),
    description: joi_1.default.string().required(),
    categoryId: joi_1.default.number().required(),
    type: joi_1.default.string().required().allow('INCOME', 'EXPENSE'),
});
exports.transactionUpdateSchema = joi_1.default.object({
    amount: joi_1.default.number().min(1).required(),
    date: joi_1.default.string().isoDate().required(),
    description: joi_1.default.string().required(),
    categoryId: joi_1.default.number().required(),
    type: joi_1.default.string().required().allow('INCOME', 'EXPENSE'),
});
