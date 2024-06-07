import CategoryRepository from '../../../Domains/categories/CategoryRepository';
import GetAllCategory, {
  IGetAllCategoriesPayload,
} from '../../../Domains/categories/entities/GetAllCategory';

interface IGetAllCategoryUseCase {
  categoryRepository: CategoryRepository;
}

export default class GetAllCategoryUseCase {
  categoryRepository: CategoryRepository;

  constructor(payload: IGetAllCategoryUseCase) {
    this.categoryRepository = payload.categoryRepository;
  }

  async execute(useCasePayload: IGetAllCategoriesPayload) {
    const dto = new GetAllCategory(useCasePayload);
    const categories = await this.categoryRepository.getAll(dto);

    return categories;
  }
}
