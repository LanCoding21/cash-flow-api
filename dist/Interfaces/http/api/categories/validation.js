"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategorySchema = exports.createCategorySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createCategorySchema = joi_1.default.object({
    type: joi_1.default.string().valid('INCOME', 'EXPENSE').required(),
    name: joi_1.default.string().required().min(4),
});
exports.updateCategorySchema = joi_1.default.object({
    type: joi_1.default.string().valid('INCOME', 'EXPENSE').required(),
    name: joi_1.default.string().required().min(4),
});
