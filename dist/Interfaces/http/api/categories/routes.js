"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = __importDefault(require("../middleware/auth"));
const validator_1 = __importDefault(require("../middleware/validator"));
const validation_1 = require("./validation");
const categoryRouter = (0, express_1.Router)();
categoryRouter.get('/', (0, auth_1.default)(), controller_1.getAll);
categoryRouter.post('/', (0, auth_1.default)(), (0, validator_1.default)(validation_1.createCategorySchema), controller_1.createCategory);
categoryRouter.get('/:id', (0, auth_1.default)(), controller_1.getById);
categoryRouter.put('/:id', (0, auth_1.default)(), (0, validator_1.default)(validation_1.updateCategorySchema), controller_1.updateCategory);
categoryRouter.delete('/:id', (0, auth_1.default)(), controller_1.deleteCategory);
exports.default = categoryRouter;
