import TransactionRepository from '../TransactionRepository';
import CreateTransaction from '../entities/CreateTransaction';
import GetAllTransaction from '../entities/GetAllTransaction';
import UpdateTransaction from '../entities/UpdateTransaction';

describe('TransactionRepository', () => {
  it('should throw error when invoke abstract method', async () => {
    const transactionReposistory = new TransactionRepository();
    const createTransaction = new CreateTransaction({
      amount: 1,
      categoryId: 1,
      createdBy: 'JOHN',
      date: '2023-11-01',
      description: 'Test',
      ownerId: 1,
      type: 'INCOME',
    });
    const updateTransaction = new UpdateTransaction({
      amount: 1,
      categoryId: 1,
      createdBy: 'JOHN',
      date: '2023-11-01',
      description: 'Test',
      ownerId: 1,
      type: 'INCOME',
    });
    const getAllTransaction = new GetAllTransaction({});
    const getSummarizeTransaction = {
      dateStart: '2023-11-11',
      dateEnd: '2023-11-11',
      ownerId: 1,
    };

    await expect(
      transactionReposistory.createTransaction(createTransaction),
    ).rejects.toThrow('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(transactionReposistory.deleteTransaction(1)).rejects.toThrow(
      'TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(
      transactionReposistory.getAllTransaction(getAllTransaction),
    ).rejects.toThrow('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(transactionReposistory.getTransactionById(1)).rejects.toThrow(
      'TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );

    await expect(
      transactionReposistory.getTransactionCount(getAllTransaction),
    ).rejects.toThrow('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(
      transactionReposistory.summarizeDailyTransaction(getSummarizeTransaction),
    ).rejects.toThrow('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(
      transactionReposistory.updateTransaction(1, updateTransaction),
    ).rejects.toThrow('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(
      transactionReposistory.verifyTransactionAvailability(1),
    ).rejects.toThrow('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(
      transactionReposistory.verifyTransactionOwner(1, 1),
    ).rejects.toThrow('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
