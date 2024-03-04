"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionRepository_1 = __importDefault(require("../TransactionRepository"));
const CreateTransaction_1 = __importDefault(require("../entities/CreateTransaction"));
const GetAllTransaction_1 = __importDefault(require("../entities/GetAllTransaction"));
const UpdateTransaction_1 = __importDefault(require("../entities/UpdateTransaction"));
describe('TransactionRepository', () => {
    it('should throw error when invoke abstract method', () => __awaiter(void 0, void 0, void 0, function* () {
        const transactionReposistory = new TransactionRepository_1.default();
        const createTransaction = new CreateTransaction_1.default({
            amount: 1,
            categoryId: 1,
            createdBy: 'JOHN',
            date: '2023-11-01',
            description: 'Test',
            ownerId: 1,
            type: 'INCOME',
        });
        const updateTransaction = new UpdateTransaction_1.default({
            amount: 1,
            categoryId: 1,
            createdBy: 'JOHN',
            date: '2023-11-01',
            description: 'Test',
            ownerId: 1,
            type: 'INCOME',
        });
        const getAllTransaction = new GetAllTransaction_1.default({});
        const getSummarizeTransaction = {
            dateStart: '2023-11-11',
            dateEnd: '2023-11-11',
            ownerId: 1,
        };
        yield expect(transactionReposistory.createTransaction(createTransaction)).rejects.toThrow('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        yield expect(transactionReposistory.deleteTransaction(1)).rejects.toThrow('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        yield expect(transactionReposistory.getAllTransaction(getAllTransaction)).rejects.toThrow('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        yield expect(transactionReposistory.getTransactionById(1)).rejects.toThrow('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        yield expect(transactionReposistory.getTransactionCount(getAllTransaction)).rejects.toThrow('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        yield expect(transactionReposistory.summarizeDailyTransaction(getSummarizeTransaction)).rejects.toThrow('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        yield expect(transactionReposistory.updateTransaction(1, updateTransaction)).rejects.toThrow('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        yield expect(transactionReposistory.verifyTransactionAvailability(1)).rejects.toThrow('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        yield expect(transactionReposistory.verifyTransactionOwner(1, 1)).rejects.toThrow('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }));
});
