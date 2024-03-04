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
const CategoryRepository_1 = __importDefault(require("../CategoryRepository"));
const CreateCategory_1 = __importDefault(require("../entities/CreateCategory"));
const GetAllCategory_1 = __importDefault(require("../entities/GetAllCategory"));
const UpdateCategory_1 = __importDefault(require("../entities/UpdateCategory"));
describe('CategoryRepository interface', () => {
    it('should throw error when invoke unimplemented method', () => __awaiter(void 0, void 0, void 0, function* () {
        const categoryRepository = new CategoryRepository_1.default();
        const createCategory = new CreateCategory_1.default({
            name: 'Test',
            ownerId: 1,
            type: 'INCOME',
        });
        const getAllCategory = new GetAllCategory_1.default({});
        const updateCategory = new UpdateCategory_1.default({
            name: 'Category',
            type: 'INCOME',
        });
        yield expect(categoryRepository.createCategory(createCategory)).rejects.toThrow('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        yield expect(categoryRepository.deleteCategory(1)).rejects.toThrow('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        yield expect(categoryRepository.getAll(getAllCategory)).rejects.toThrow('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        yield expect(categoryRepository.getCategoryById(1)).rejects.toThrow('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        yield expect(categoryRepository.getCategoryCount(getAllCategory)).rejects.toThrow('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        yield expect(categoryRepository.updateCategory(1, updateCategory)).rejects.toThrow('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        yield expect(categoryRepository.verifyCategoryAvailability(1)).rejects.toThrow('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        yield expect(categoryRepository.verifyCategoryOwner(1, 1)).rejects.toThrow('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }));
});
