import CategoryRepository from '../../../Domains/categories/CategoryRepository';
import UpdateCategory from '../../../Domains/categories/entities/UpdateCategory';

interface IUpdateCategoryUseCasePayload {
  categoryRepository: CategoryRepository;
}

export default class UpdateCategoryUseCase {
  categoryRepository: CategoryRepository;

  constructor(payload: IUpdateCategoryUseCasePayload) {
    this.categoryRepository = payload.categoryRepository;
  }

  async execute(id: number, useCasePayload: any) {
    const updateCategory = new UpdateCategory(useCasePayload);
    await this.categoryRepository.verifyCategoryAvailability(id);

    const category = await this.categoryRepository.getCategoryById(id);
    await this.categoryRepository.verifyCategoryOwner(id, category.ownerId);

    await this.categoryRepository.updateCategory(id, updateCategory);
  }
}
