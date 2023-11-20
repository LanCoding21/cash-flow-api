import InvariantError from '../../../Commons/exceptions/InvariantError';
import TransactionRepository from '../../../Domains/transactions/TransactionRepository';
import GetSummarizeDailyTransaction, {
  IGetSummarizeDailyTransactionPayload,
} from '../../../Domains/transactions/entities/GetSummarizeDailyTransaction';

export default class GetSummarizeDailyTransactionUseCase {
  repository: TransactionRepository;

  constructor(repository: TransactionRepository) {
    this.repository = repository;
  }

  async execute(useCasePayload: IGetSummarizeDailyTransactionPayload) {
    const payload = new GetSummarizeDailyTransaction(useCasePayload);

    if (!payload.dateStart) throw new InvariantError('Date start is required');
    if (!payload.dateEnd) throw new InvariantError('Date end is required');

    const result = await this.repository.summarizeDailyTransaction(payload);
    return result;
  }
}
