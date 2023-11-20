import CategoryRepository from '../../../Domains/categories/CategoryRepository';
import CreateCategory from '../../../Domains/categories/entities/CreateCategory';

interface IAddCategoryUseCasePayload {
  categoryRepository: CategoryRepository;
}

export default class AddCategoryUseCase {
  categoryRepository: CategoryRepository;

  constructor(payload: IAddCategoryUseCasePayload) {
    this.categoryRepository = payload.categoryRepository;
  }

  async execute(useCasePayload: any) {
    const createCategory = new CreateCategory(useCasePayload);

    const categoryId = await this.categoryRepository.createCategory(
      createCategory,
    );

    return categoryId;
  }
}
