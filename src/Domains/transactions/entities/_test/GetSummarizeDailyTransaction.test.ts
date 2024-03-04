import GetSummarizeDailyTransaction from '../GetSummarizeDailyTransaction';

describe('GetSummarizeDailyTransaction', () => {
  it('should create entity correctly', () => {
    const payload = {
      dateStart: new Date().toISOString(),
      dateEnd: new Date().toISOString(),
      ownerId: 1,
    };

    const entity = new GetSummarizeDailyTransaction(payload);

    expect(entity.dateEnd).toEqual(payload.dateEnd);
    expect(entity.dateStart).toEqual(payload.dateStart);
    expect(entity.ownerId).toEqual(payload.ownerId);
  });
});
