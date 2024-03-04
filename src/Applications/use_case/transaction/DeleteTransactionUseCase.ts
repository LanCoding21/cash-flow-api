import TransactionRepository from '../../../Domains/transactions/TransactionRepository';

export default class DeleteTransactionUseCase {
  repository: TransactionRepository;

  constructor(repository: TransactionRepository) {
    this.repository = repository;
  }

  async execute(id: number, userId: number) {
    await this.repository.verifyTransactionAvailability(id);
    await this.repository.verifyTransactionOwner(id, userId);
    await this.repository.deleteTransaction(id);
  }
}
