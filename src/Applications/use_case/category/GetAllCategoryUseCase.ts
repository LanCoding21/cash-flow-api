import CategoryRepository from '../../../Domains/categories/CategoryRepository';
import GetAllCategory from '../../../Domains/categories/entities/GetAllCategory';

interface IGetAllCategoryUseCase {
  categoryRepository: CategoryRepository;
}

export default class GetAllCategoryUseCase {
  categoryRepository: CategoryRepository;

  constructor(payload: IGetAllCategoryUseCase) {
    this.categoryRepository = payload.categoryRepository;
  }

  async execute(useCasePayload: GetAllCategory) {
    const categories = await this.categoryRepository.getAll(useCasePayload);

    return categories;
  }
}
