import TransactionRepository from '../../../Domains/transactions/TransactionRepository';
import UpdateTransaction, {
  IUpdateTransactionPayload,
} from '../../../Domains/transactions/entities/UpdateTransaction';

export default class UpdateTransactionUseCase {
  repository: TransactionRepository;

  constructor(repository: TransactionRepository) {
    this.repository = repository;
  }

  async execute(
    id: number,
    userId: number,
    payload: IUpdateTransactionPayload,
  ) {
    const updateTransaction = new UpdateTransaction(payload);

    await this.repository.verifyTransactionAvailability(id);
    await this.repository.verifyTransactionOwner(id, userId);
    await this.repository.updateTransaction(id, updateTransaction);
  }
}
