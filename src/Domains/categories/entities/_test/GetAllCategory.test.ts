import GetAllCategory from '../GetAllCategory';

describe('GetAllCategory entities', () => {
  it('should create entities correctly', () => {
    const payload = {
      ownerId: 1,
      type: 'INCOME',
      limit: 1,
      offset: 1,
      searchText: 'TEST',
    };

    const getAllCategory = new GetAllCategory(payload);

    expect(getAllCategory.limit).toEqual(payload.limit);
    expect(getAllCategory.offset).toEqual(payload.offset);
    expect(getAllCategory.ownerId).toEqual(payload.ownerId);
    expect(getAllCategory.searchText).toEqual(payload.searchText);
    expect(getAllCategory.type).toEqual(payload.type);
  });
});
