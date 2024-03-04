import SummarizeDailyTransaction from '../SummarizeDailyTransaction';

describe('SummarizeDailyTransaction entity', () => {
  it('should create entity correctly', () => {
    const payload = {
      date: new Date().toISOString(),
      type: 'INCOME',
      amount: 1,
      category: 'Salary',
    };

    const entity = new SummarizeDailyTransaction(payload);

    expect(entity.amount).toEqual(payload.amount);
    expect(entity.category).toEqual(payload.category);
    expect(entity.date).toEqual(payload.date);
    expect(entity.type).toEqual(payload.type);
  });
});
