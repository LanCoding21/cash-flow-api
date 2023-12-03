import UpdateCategory from '../UpdateCategory';

describe('UpdateCategory entities', () => {
  it('should throw error when category type is invalid', () => {
    const payload = {
      name: 'Category',
      type: 'INVALID',
    };

    const updateCategory = new UpdateCategory(payload);

    expect(updateCategory.name).toEqual(payload.name);
    expect(updateCategory.type).toEqual(payload.type);
  });
});
