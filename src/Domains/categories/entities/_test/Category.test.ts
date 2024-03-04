import Category from '../Category';

describe('Category entities', () => {
  it('should throw error when category type is not valid', () => {
    const payload = {
      id: 1,
      name: 'Category',
      type: 'INVALID CATEGORY',
      ownerId: 1,
    };

    expect(() => new Category(payload)).toThrow('CATEGORY.TYPE_IS_INVALID');
  });

  it('should create Category entities correctly', () => {
    const payload = {
      id: 1,
      name: 'Category',
      type: 'INCOME',
      ownerId: 1,
    };

    const category = new Category(payload);

    expect(category.id).toEqual(payload.id);
    expect(category.name).toEqual(payload.name);
    expect(category.type).toEqual(payload.type);
    expect(category.ownerId).toEqual(payload.ownerId);
  });

  it('should create Category entities correctly', () => {
    const payload = {
      id: 1,
      name: 'Category',
      type: 'EXPENSE',
      ownerId: 1,
    };

    const category = new Category(payload);

    expect(category.id).toEqual(payload.id);
    expect(category.name).toEqual(payload.name);
    expect(category.type).toEqual(payload.type);
    expect(category.ownerId).toEqual(payload.ownerId);
  });
});
