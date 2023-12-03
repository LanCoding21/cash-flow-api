import CreateCategory from '../CreateCategory';

describe('CreateCategory entities', () => {
  it('should throw error when category type is not valid', () => {
    const payload = {
      name: 'Category',
      type: 'INVALID',
      ownerId: 1,
    };

    expect(() => new CreateCategory(payload)).toThrow(
      'CREATE_CATEGORY.TYPE_IS_INVALID',
    );
  });

  it('should create entities correctly when category type is valid', () => {
    const payload = {
      name: 'Category',
      type: 'INCOME',
      ownerId: 1,
    };

    const createCategory = new CreateCategory(payload);

    expect(createCategory.name).toEqual(payload.name);
    expect(createCategory.type).toEqual(payload.type);
    expect(createCategory.ownerId).toEqual(payload.ownerId);
  });

  it('should create entities correctly when category type is valid', () => {
    const payload = {
      name: 'Category',
      type: 'EXPENSE',
      ownerId: 1,
    };

    const createCategory = new CreateCategory(payload);

    expect(createCategory.name).toEqual(payload.name);
    expect(createCategory.type).toEqual(payload.type);
    expect(createCategory.ownerId).toEqual(payload.ownerId);
  });
});
