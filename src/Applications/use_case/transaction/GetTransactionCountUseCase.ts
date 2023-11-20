import TransactionRepository from '../../../Domains/transactions/TransactionRepository';
import GetAllTransaction, {
  IGetAllTransactionPayload,
} from '../../../Domains/transactions/entities/GetAllTransaction';

export default class GetTransactionCountUseCase {
  repository: TransactionRepository;

  constructor(repository: TransactionRepository) {
    this.repository = repository;
  }

  async execute(useCasePayload: IGetAllTransactionPayload) {
    const payload = new GetAllTransaction(useCasePayload);

    const count = await this.repository.getTransactionCount(payload);
    return count;
  }
}
