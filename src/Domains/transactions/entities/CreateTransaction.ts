export interface ICreateTransactionPayload {
  type: string;
  description: string;
  categoryId: number;
  ownerId: number;
  amount: number;
  receiptFile?: string;
  date: string;
  createdBy: string;
}

export default class CreateTransaction {
  type: string;

  description: string;

  categoryId: number;

  ownerId: number;

  amount: number;

  date: string;

  receiptFile?: string;

  createdBy: string;

  constructor(payload: ICreateTransactionPayload) {
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

  verifyPayload(payload: ICreateTransactionPayload) {
    const { type, amount } = payload;

    if (amount < 1) throw new Error('CREATE_TRANSACTION.AMOUNT_IS_INVALID');
    if (!['INCOME', 'EXPENSE'].includes(type)) {
      throw new Error('CREATE_TRANSACTION.TYPE_IS_INVALID');
    }
  }
}
