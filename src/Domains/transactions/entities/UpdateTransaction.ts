export interface IUpdateTransactionPayload {
  type: string;
  description: string;
  categoryId: number;
  ownerId: number;
  amount: number;
  receiptFile?: string;
  createdBy: string;
  date: string;
}

export default class UpdateTransaction {
  type: string;

  description: string;

  categoryId: number;

  ownerId: number;

  amount: number;

  date: string;

  receiptFile?: string;

  createdBy: string;

  constructor(payload: IUpdateTransactionPayload) {
    this.verifyPayload(payload);

    this.type = payload.type;
    this.description = payload.description;
    this.categoryId = payload.categoryId;
    this.ownerId = payload.ownerId;
    this.amount = payload.amount;
    this.receiptFile = payload.receiptFile;
    this.createdBy = payload.createdBy;
    this.date = payload.date;
  }

  verifyPayload(payload: IUpdateTransactionPayload) {
    const { type, amount } = payload;

    if (amount < 1) throw new Error('UPDATE_TRANSACTION.AMOUNT_IS_INVALID');
    if (!['INCOME', 'EXPENSE'].includes(type)) {
      throw new Error('UPDATE_TRANSACTION.TYPE_IS_INVALID');
    }
  }
}
