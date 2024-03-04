import TransactionRepository from '../../../Domains/transactions/TransactionRepository';

export default class GetTransactionByIdUseCase {
  repository: TransactionRepository;

  constructor(repository: TransactionRepository) {
    this.repository = repository;
  }

  async execute(id: number, userId: number) {
    await this.repository.verifyTransactionAvailability(id);
    await this.repository.verifyTransactionOwner(id, userId);

    const curr = await this.repository.getTransactionById(id);

    return curr;
  }
}
