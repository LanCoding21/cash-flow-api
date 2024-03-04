import TransactionRepository from '../../../Domains/transactions/TransactionRepository';
import CreateTransaction, {
  ICreateTransactionPayload,
} from '../../../Domains/transactions/entities/CreateTransaction';

export default class AddTransactionUseCase {
  repository: TransactionRepository;

  constructor(repository: TransactionRepository) {
    this.repository = repository;
  }

  async execute(useCasePayload: ICreateTransactionPayload) {
    const createTransaction = new CreateTransaction(useCasePayload);

    const id = await this.repository.createTransaction(createTransaction);

    return id;
  }
}
