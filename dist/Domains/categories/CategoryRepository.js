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
Object.defineProperty(exports, "__esModule", { value: true });
class CategoryRepository {
    createCategory(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        });
    }
    getAll(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        });
    }
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        });
    }
    verifyCategoryAvailability(id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        });
    }
    verifyCategoryOwner(id, owner_id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        });
    }
    updateCategory(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        });
    }
    getCategoryCount(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        });
    }
}
exports.default = CategoryRepository;
