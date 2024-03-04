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
exports.getAll = exports.getById = exports.deleteCategory = exports.updateCategory = exports.createCategory = void 0;
const container_1 = __importDefault(require("../../../../Infrastructures/container"));
const AddCategoryUseCase_1 = __importDefault(require("../../../../Applications/use_case/category/AddCategoryUseCase"));
const UpdateCategoryUseCase_1 = __importDefault(require("../../../../Applications/use_case/category/UpdateCategoryUseCase"));
const DeleteCategoryUseCase_1 = __importDefault(require("../../../../Applications/use_case/category/DeleteCategoryUseCase"));
const GetCategoryByIdUseCase_1 = __importDefault(require("../../../../Applications/use_case/category/GetCategoryByIdUseCase"));
const GetAllCategoryUseCase_1 = __importDefault(require("../../../../Applications/use_case/category/GetAllCategoryUseCase"));
const GetCategoryCountUseCase_1 = __importDefault(require("../../../../Applications/use_case/category/GetCategoryCountUseCase"));
function createCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const useCase = container_1.default.getInstance(AddCategoryUseCase_1.default.name);
            const categoryId = yield useCase.execute(Object.assign(Object.assign({}, req.body), { ownerId: req.user_id }));
            return res.status(201).json({
                message: 'Category created successfully!',
                data: { categoryId },
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.createCategory = createCategory;
function updateCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const useCase = container_1.default.getInstance(UpdateCategoryUseCase_1.default.name);
            yield useCase.execute(+req.params.id, req.body);
            return res.status(200).json({ message: 'Category updated successfully!' });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.updateCategory = updateCategory;
function deleteCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const useCase = container_1.default.getInstance(DeleteCategoryUseCase_1.default.name);
            yield useCase.execute(+req.params.id, req.user_id);
            return res.json({ message: 'Category deleted successfully!' });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.deleteCategory = deleteCategory;
function getById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const useCase = container_1.default.getInstance(GetCategoryByIdUseCase_1.default.name);
            const category = yield useCase.execute(+req.params.id, req.user_id);
            return res.json({
                message: 'Success get category data',
                data: category,
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getById = getById;
function getAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const useCase = container_1.default.getInstance(GetAllCategoryUseCase_1.default.name);
            const getCountUseCase = container_1.default.getInstance(GetCategoryCountUseCase_1.default.name);
            const { limit, offset } = req.params;
            const { type, searchText } = req.query;
            const categories = yield useCase.execute({
                ownerId: req.user_id,
                type: type,
                limit: limit ? +limit : undefined,
                offset: offset ? +offset : undefined,
                searchText: searchText,
            });
            const totalItems = yield getCountUseCase.execute({
                ownerId: req.user_id,
                type: type,
                searchText: searchText,
            });
            return res.json({
                message: 'Success get categories data',
                data: categories,
                page: {
                    totalItems,
                },
            });
        }
        catch (error) {
            return next(error);
        }
    });
}
exports.getAll = getAll;
