/* eslint-disable @typescript-eslint/no-unused-vars */
import CreateTransaction from './entities/CreateTransaction';
import GetAllTransaction from './entities/GetAllTransaction';
import GetSummarizeDailyTransaction from './entities/GetSummarizeDailyTransaction';
import SummarizeDailyTransaction from './entities/SummarizeDailyTransaction';
import Transaction from './entities/Transaction';
import UpdateTransaction from './entities/UpdateTransaction';

export default class TransactionRepository {
  async createTransaction(payload: CreateTransaction): Promise<number> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updateTransaction(
    id: number,
    payload: UpdateTransaction,
  ): Promise<void> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteTransaction(id: number): Promise<void> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyTransactionAvailability(id: number): Promise<void> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyTransactionOwner(id: number, userId: number): Promise<void> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getAllTransaction(payload: GetAllTransaction): Promise<Transaction[]> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getTransactionById(id: number): Promise<Transaction> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async summarizeDailyTransaction(
    payload: GetSummarizeDailyTransaction,
  ): Promise<SummarizeDailyTransaction[]> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getTransactionCount(payload: GetAllTransaction): Promise<number> {
    throw new Error('TRANSACTION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}
