import UpdateTransaction from '../UpdateTransaction';

describe('UpdateTransaction', () => {
  it('should throw error when amount is < 1', () => {
    const payload = {
      type: 'INCOME',
      description: 'Description',
      categoryId: 1,
      ownerId: 1,
      amount: 0,
      createdBy: 'JOHN',
      date: new Date().toISOString(),
    };

    expect(() => new UpdateTransaction(payload)).toThrow(
      'UPDATE_TRANSACTION.AMOUNT_IS_INVALID',
    );
  });

  it('should throw error when transaction type is invalid', () => {
    const payload = {
      type: 'INVALID',
      description: 'Description',
      categoryId: 1,
      ownerId: 1,
      amount: 1,
      createdBy: 'JOHN',
      date: new Date().toISOString(),
    };

    expect(() => new UpdateTransaction(payload)).toThrow(
      'UPDATE_TRANSACTION.TYPE_IS_INVALID',
    );
  });

  it('should create entities correctly', () => {
    const payload = {
      type: 'INCOME',
      description: 'Description',
      categoryId: 1,
      ownerId: 1,
      amount: 1,
      createdBy: 'JOHN',
      date: new Date().toISOString(),
    };

    const updateTransaction = new UpdateTransaction(payload);

    expect(updateTransaction.amount).toEqual(payload.amount);
    expect(updateTransaction.categoryId).toEqual(payload.categoryId);
    expect(updateTransaction.createdBy).toEqual(payload.createdBy);
    expect(updateTransaction.date).toEqual(payload.date);
    expect(updateTransaction.description).toEqual(payload.description);
    expect(updateTransaction.ownerId).toEqual(payload.ownerId);
    expect(updateTransaction.type).toEqual(payload.type);
    expect(updateTransaction.receiptFile).toBeFalsy();
  });
});
