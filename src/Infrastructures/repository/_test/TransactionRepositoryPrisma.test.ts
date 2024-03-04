import prismaMock from '../../database/prisma/singleton';
import TransactionRepositoryPrisma from '../TransactionRepositoryPrisma';

describe('TransactionRepositoryPrisma', () => {
  const repository = new TransactionRepositoryPrisma(prismaMock);
  const categoryPayload = {
    id: 1,
    ownerId: 1,
    name: 'Salary',
    type: 'INCOME',
    status: 1,
  };
  const transactionPaylod = {
    id: 1,
    createdAt: new Date(),
    date: new Date(),
    ownerId: 1,
    amount: 1000,
    categoryId: 1,
    createdBy: 'John',
    description: 'Monthly salary',
    receiptFile: null,
    status: 1,
    type: 'INCOME',
    updatedAt: new Date(),
  };

  describe('getTransactionById', () => {
    it('should return Transaction entity', async () => {
      prismaMock.transactions.findFirst.mockResolvedValue({
        ...transactionPaylod,
        category:
          prismaMock.category.findFirst.mockResolvedValue(categoryPayload),
      });

      const res = await repository.getTransactionById(1);

      console.log({ res });
    });
  });
});
