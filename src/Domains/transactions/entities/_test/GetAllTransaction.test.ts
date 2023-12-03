import GetAllTransaction from '../GetAllTransaction';

describe('GetAllTransaction entities', () => {
  it('should be create entity correctly', () => {
    const payload = {
      ownerId: 1,
      type: 'INCOME',
      limit: 1,
      offset: 1,
      date: new Date().toISOString(),
      searchText: 'TEST',
      categoryId: 1,
    };

    const entity = new GetAllTransaction(payload);

    expect(entity.categoryId).toEqual(payload.categoryId);
    expect(entity.date).toEqual(payload.date);
    expect(entity.limit).toEqual(payload.limit);
    expect(entity.offset).toEqual(payload.offset);
    expect(entity.ownerId).toEqual(payload.ownerId);
    expect(entity.searchText).toEqual(payload.searchText);
    expect(entity.type).toEqual(payload.type);
  });
});
