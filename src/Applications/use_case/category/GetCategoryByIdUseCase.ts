import CategoryRepository from '../../../Domains/categories/CategoryRepository';

interface IGetCategoryByIdUseCase {
  categoryRepository: CategoryRepository;
}

export default class GetCategoryByIdUseCase {
  categoryRepository: CategoryRepository;

  constructor(payload: IGetCategoryByIdUseCase) {
    this.categoryRepository = payload.categoryRepository;
  }

  async execute(id: number, userId: number) {
    await this.categoryRepository.verifyCategoryAvailability(id);
    const category = await this.categoryRepository.getCategoryById(id);
    await this.categoryRepository.verifyCategoryOwner(id, userId);
    return category;
  }
}
