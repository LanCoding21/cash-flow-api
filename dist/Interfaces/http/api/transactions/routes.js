"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const InvariantError_1 = __importDefault(require("../../../../Commons/exceptions/InvariantError"));
const controller_1 = require("./controller");
const validator_1 = __importDefault(require("../middleware/validator"));
const validation_1 = require("./validation");
const auth_1 = __importDefault(require("../middleware/auth"));
const diskStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join('./uploads'));
    },
    filename: (req, file, callback) => {
        callback(null, `${(0, uuid_1.v4)()}${path_1.default.extname(file.originalname)}`);
    },
});
const transactionRouter = (0, express_1.Router)();
transactionRouter.post('/', (0, auth_1.default)(), (0, multer_1.default)({
    storage: diskStorage,
    limits: {
        fieldSize: 1 * 1024 * 1024,
    },
    fileFilter: (req, file, callback) => {
        const ext = path_1.default.extname(file.originalname);
        if (!['.png', '.jpg', '.gif', '.jpeg'].includes(ext)) {
            return callback(new InvariantError_1.default('Only images are allowed'));
        }
        return callback(null, true);
    },
}).single('receipt'), (0, validator_1.default)(validation_1.transactionCreateSchema), controller_1.createTransactions);
transactionRouter.get('/summarize/daily', (0, auth_1.default)(), controller_1.getSummarizeDailyTransaction);
transactionRouter.get('/', (0, auth_1.default)(), controller_1.getUserTransactions);
transactionRouter.get('/:id', (0, auth_1.default)(), controller_1.getTransactionById);
transactionRouter.delete('/:id', (0, auth_1.default)(), controller_1.deleteTransaction);
transactionRouter.put('/:id', (0, auth_1.default)(), (0, multer_1.default)({
    storage: diskStorage,
    limits: {
        fieldSize: 1 * 1024 * 1024,
    },
    fileFilter: (req, file, callback) => {
        const ext = path_1.default.extname(file.originalname);
        if (!['.png', '.jpg', '.gif', '.jpeg'].includes(ext)) {
            return callback(new InvariantError_1.default('Only images are allowed'));
        }
        return callback(null, true);
    },
}).single('receipt'), (0, validator_1.default)(validation_1.transactionUpdateSchema), controller_1.updateTransaction);
exports.default = transactionRouter;
