import CategoryRepository from '../CategoryRepository';
import CreateCategory from '../entities/CreateCategory';
import GetAllCategory from '../entities/GetAllCategory';
import UpdateCategory from '../entities/UpdateCategory';

describe('CategoryRepository interface', () => {
  it('should throw error when invoke unimplemented method', async () => {
    const categoryRepository = new CategoryRepository();
    const createCategory = new CreateCategory({
      name: 'Test',
      ownerId: 1,
      type: 'INCOME',
    });
    const getAllCategory = new GetAllCategory({});
    const updateCategory = new UpdateCategory({
      name: 'Category',
      type: 'INCOME',
    });

    await expect(
      categoryRepository.createCategory(createCategory),
    ).rejects.toThrow('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(categoryRepository.deleteCategory(1)).rejects.toThrow(
      'CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(categoryRepository.getAll(getAllCategory)).rejects.toThrow(
      'CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(categoryRepository.getCategoryById(1)).rejects.toThrow(
      'CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(
      categoryRepository.getCategoryCount(getAllCategory),
    ).rejects.toThrow('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(
      categoryRepository.updateCategory(1, updateCategory),
    ).rejects.toThrow('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(
      categoryRepository.verifyCategoryAvailability(1),
    ).rejects.toThrow('CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(categoryRepository.verifyCategoryOwner(1, 1)).rejects.toThrow(
      'CATEGORY_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
