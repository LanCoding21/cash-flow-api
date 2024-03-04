import AuthorizationError from '../../../Commons/exceptions/AuthorizationError';
import Category from '../../../Domains/categories/entities/Category';
import CreateCategory from '../../../Domains/categories/entities/CreateCategory';
import UpdateCategory from '../../../Domains/categories/entities/UpdateCategory';
import prismaMock from '../../database/prisma/singleton';
import CategoryRepositoryPrisma from '../CategoryRepositoryPrisma';

describe('CategoryRepositoryPrisma', () => {
  const repository = new CategoryRepositoryPrisma(prismaMock);
  const categoryPayload = {
    id: 1,
    name: 'Salary',
    ownerId: 1,
    status: 1,
    type: 'INCOME',
  };

  describe('getAll', () => {
    it('should return list of Category entities', async () => {
      const expectedCategory = new Category(categoryPayload);
      const prismaSpy = jest.spyOn(prismaMock.category, 'findMany');
      prismaMock.category.findMany.mockResolvedValue([categoryPayload]);

      const categories = await repository.getAll({});

      expect(categories).toHaveLength(1);
      expect(categories[0]).toEqual(expectedCategory);
      expect(prismaSpy).toHaveBeenCalledWith({
        where: { AND: [{ status: 1 }] },
      });
    });

    it('should return list of filtered Category entities', async () => {
      // Arrange
      const expectedCategory = new Category(categoryPayload);
      const payload = {
        limit: 10,
        offset: 1,
        type: 'INCOME',
        ownerId: 1,
        searchText: 'Salary',
      };
      const findManyPayload = {
        take: payload.limit,
        skip: 0,
        where: {
          AND: [
            {
              status: 1,
            },
            {
              type: payload.type,
            },
            {
              ownerId: payload.ownerId,
            },
          ],
          OR: [
            {
              name: {
                contains: payload.searchText.toLowerCase(),
                mode: 'insensitive',
              },
            },
          ],
        },
      };
      const prismaSpy = jest.spyOn(prismaMock.category, 'findMany');
      prismaMock.category.findMany.mockResolvedValue([categoryPayload]);

      // Act
      const categories = await repository.getAll(payload);

      // Assert
      expect(categories).toHaveLength(1);
      expect(categories[0]).toEqual(expectedCategory);
      expect(prismaSpy).toHaveBeenCalledWith(findManyPayload);
    });
  });

  describe('getCategoryById', () => {
    it('should throw NotFoundError if Category is not exist', async () => {
      prismaMock.category.findFirst.mockResolvedValue(null);

      await expect(repository.getCategoryById(1)).rejects.toThrow(
        'Category not found',
      );
    });

    it('should return Category entity if category is exist', async () => {
      const expectedCategory = new Category(categoryPayload);
      const prismaSpy = jest.spyOn(prismaMock.category, 'findFirst');
      prismaMock.category.findFirst.mockResolvedValue(categoryPayload);

      const category = await repository.getCategoryById(1);

      expect(category).toEqual(expectedCategory);
      expect(prismaSpy).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('createCategory', () => {
    it('should return id of created category', async () => {
      const payload = {
        name: 'Salary',
        ownerId: 1,
        type: 'INCOME',
      };
      const prismaSpy = jest.spyOn(prismaMock.category, 'create');
      prismaMock.category.create.mockResolvedValue(categoryPayload);

      const id = await repository.createCategory(new CreateCategory(payload));

      expect(id).toBe(categoryPayload.id);
      expect(prismaSpy).toHaveBeenCalledWith({ data: payload });
    });
  });

  describe('updateCategory', () => {
    it('should not throw error when invoked', async () => {
      const payload = new UpdateCategory({ name: 'Salary', type: 'INCOME' });
      const prismaSpy = jest.spyOn(prismaMock.category, 'update');
      prismaMock.category.update.mockResolvedValue(categoryPayload);

      await expect(
        repository.updateCategory(1, payload),
      ).resolves.not.toThrow();
      expect(prismaSpy).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { name: 'Salary', type: 'INCOME' },
      });
    });
  });

  describe('deleteCategory', () => {
    it('should update the status category to 0', async () => {
      const prismaSpy = jest.spyOn(prismaMock.category, 'update');
      prismaMock.category.update.mockResolvedValue({
        ...categoryPayload,
        status: 0,
      });
      prismaMock.category.findFirst.mockResolvedValue({
        ...categoryPayload,
        status: 0,
      });

      await repository.deleteCategory(1);
      const curr = await prismaMock.category.findFirst({ where: { id: 1 } });

      expect(curr?.status).toBe(0);
      expect(prismaSpy).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { status: 0 },
      });
    });
  });

  describe('verifyCategoryAvailability', () => {
    it('should throw NotFoundError if category is not exist', async () => {
      prismaMock.category.findFirst.mockResolvedValue(null);

      await expect(repository.verifyCategoryAvailability(1)).rejects.toThrow(
        'Category not found',
      );
    });

    it('should not throw error if category is exist', async () => {
      const prismaSpy = jest.spyOn(prismaMock.category, 'findFirst');
      prismaMock.category.findFirst.mockResolvedValue({
        id: 1,
        name: 'Salary',
        type: 'INCOME',
        status: 1,
        ownerId: 1,
      });

      await expect(
        repository.verifyCategoryAvailability(1),
      ).resolves.not.toThrow();
      expect(prismaSpy).toHaveBeenCalledWith({ where: { id: 1, status: 1 } });
    });
  });

  describe('verifyCategoryOwner', () => {
    it('should throw AuthorizationError if accessed by other user', async () => {
      prismaMock.category.findFirst.mockResolvedValue({
        id: 1,
        status: 1,
        name: 'Salary',
        ownerId: 2,
        type: 'INCOME',
      });

      await expect(repository.verifyCategoryOwner(1, 1)).rejects.toThrow(
        new AuthorizationError('Not permitted'),
      );
    });

    it('should not throw AuthorizationError if accessed by the owner', async () => {
      const prismaSpy = jest.spyOn(prismaMock.category, 'findFirst');
      prismaMock.category.findFirst.mockResolvedValue({
        id: 1,
        status: 1,
        name: 'Salary',
        ownerId: 2,
        type: 'INCOME',
      });

      await expect(repository.verifyCategoryOwner(1, 2)).resolves.not.toThrow();
      expect(prismaSpy).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('getCategoryCount', () => {
    it('should return the count of categories', async () => {
      prismaMock.category.count.mockResolvedValue(1);

      const count = await repository.getCategoryCount({});

      expect(count).toBe(1);
    });

    it('should return the count of filtered categories', async () => {
      prismaMock.category.count.mockResolvedValue(1);
      const payload = {
        type: 'INCOME',
        ownerId: 1,
        searchText: 'Salary',
      };
      const prismaSpy = jest.spyOn(prismaMock.category, 'count');

      const count = await repository.getCategoryCount(payload);

      expect(count).toBe(1);
      expect(prismaSpy).toHaveBeenCalledWith({
        where: {
          AND: [
            { status: 1 },
            { type: payload.type },
            { ownerId: payload.ownerId },
          ],
          OR: [
            {
              name: {
                contains: payload.searchText.toLowerCase(),
                mode: 'insensitive',
              },
            },
          ],
        },
      });
    });
  });
});
