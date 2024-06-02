import CategoryRepository from '../../../Domains/categories/CategoryRepository';
import GetAllCategory, {
  IGetAllCategoriesPayload,
} from '../../../Domains/categories/entities/GetAllCategory';

export default class GetCategoryCountUseCase {
  repository: CategoryRepository;

  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  async execute(payload: IGetAllCategoriesPayload) {
    const dto = new GetAllCategory(payload);
    const count = await this.repository.getCategoryCount(dto);

    return count;
  }
}
