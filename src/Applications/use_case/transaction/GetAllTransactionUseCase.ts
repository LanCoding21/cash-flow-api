import TransactionRepository from '../../../Domains/transactions/TransactionRepository';
import GetAllTransaction, {
  IGetAllTransactionPayload,
} from '../../../Domains/transactions/entities/GetAllTransaction';

export default class GetAllTransactionUseCase {
  repository: TransactionRepository;

  constructor(repository: TransactionRepository) {
    this.repository = repository;
  }

  async execute(payload: IGetAllTransactionPayload) {
    const getAllTransaction = new GetAllTransaction(payload);

    const result = await this.repository.getAllTransaction(getAllTransaction);

    return result;
  }
}
