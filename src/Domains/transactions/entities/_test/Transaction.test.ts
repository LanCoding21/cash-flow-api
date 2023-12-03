import Category from '../../../categories/entities/Category';
import Transaction from '../Transaction';

describe('Transaction entity', () => {
  it('should create entity correctly', () => {
    const payload = {
      id: 1,
      type: 'INCOME',
      description: 'Salary',
      categoryId: 1,
      ownerId: 1,
      amount: 1,
      category: new Category({
        id: 1,
        name: 'Salary',
        ownerId: 1,
        type: 'INCOME',
      }),
      createdBy: 'John',
      createdAt: new Date().toISOString(),
      date: new Date().toISOString(),
    };

    const entity = new Transaction(payload);

    expect(entity.amount).toEqual(payload.amount);
    expect(entity.category.id).toEqual(payload.category.id);
    expect(entity.category.name).toEqual(payload.category.name);
    expect(entity.category.ownerId).toEqual(payload.category.ownerId);
    expect(entity.category.type).toEqual(payload.category.type);
    expect(entity.categoryId).toEqual(payload.categoryId);
    expect(entity.createdAt).toEqual(payload.createdAt);
    expect(entity.createdBy).toEqual(payload.createdBy);
    expect(entity.date).toEqual(payload.date);
    expect(entity.description).toEqual(payload.description);
    expect(entity.id).toEqual(payload.id);
    expect(entity.ownerId).toEqual(payload.ownerId);
    expect(entity.type).toEqual(payload.type);
  });
});
