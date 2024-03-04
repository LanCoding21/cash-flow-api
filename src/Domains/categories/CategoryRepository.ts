/* eslint-disable @typescript-eslint/no-unused-vars */
import Category from './entities/Category';
import CreateCategory from './entities/CreateCategory';
import GetAllCategory from './entities/GetAllCategory';
import UpdateCategory from './entities/UpdateCategory';

export default class CategoryRepository {
  async createCategory(payload: CreateCategory): Promise<number> {
    throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getAll(payload: GetAllCategory): Promise<Category[]> {
    throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getCategoryById(id: number): Promise<Category> {
    throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyCategoryAvailability(id: number): Promise<void> {
    throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyCategoryOwner(id: number, owner_id: number) {
    throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updateCategory(id: number, payload: UpdateCategory) {
    throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteCategory(id: number) {
    throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getCategoryCount(payload: GetAllCategory): Promise<number> {
    throw new Error('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}
