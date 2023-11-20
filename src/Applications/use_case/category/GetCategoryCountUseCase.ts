import CategoryRepository from '../../../Domains/categories/CategoryRepository';
import GetAllCategory from '../../../Domains/categories/entities/GetAllCategory';

export default class GetCategoryCountUseCase {
  repository: CategoryRepository;

  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  async execute(payload: GetAllCategory) {
    const count = await this.repository.getCategoryCount(payload);

    return count;
  }
}
