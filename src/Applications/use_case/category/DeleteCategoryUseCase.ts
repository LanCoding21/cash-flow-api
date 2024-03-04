import CategoryRepository from '../../../Domains/categories/CategoryRepository';

interface IDeleteCategoryUseCasePayload {
  categoryRepository: CategoryRepository;
}

export default class DeleteCategoryUseCase {
  categoryRepository: CategoryRepository;

  constructor(payload: IDeleteCategoryUseCasePayload) {
    this.categoryRepository = payload.categoryRepository;
  }

  async execute(id: number, userId: number) {
    await this.categoryRepository.verifyCategoryAvailability(id);
    await this.categoryRepository.verifyCategoryOwner(id, userId);
    await this.categoryRepository.deleteCategory(id);
  }
}
