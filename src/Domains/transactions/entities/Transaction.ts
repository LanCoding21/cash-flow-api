import Category from '../../categories/entities/Category';

interface ITransactionPayload {
  id: number;
  type: string;
  description: string;
  categoryId: number;
  ownerId: number;
  amount: number;
  receiptFile?: string | null;
  createdBy: string;
  createdAt: string;
  category: Category;
  date: string;
}

export default class Transaction {
  id: number;

  type: string;

  description: string;

  categoryId: number;

  ownerId: number;

  amount: number;

  category: Category;

  receiptFile?: string | null;

  createdBy: string;

  createdAt: string;

  date: string;

  constructor(payload: ITransactionPayload) {
    this.id = payload.id;
    this.type = payload.type;
    this.description = payload.description;
    this.categoryId = payload.categoryId;
    this.ownerId = payload.ownerId;
    this.amount = payload.amount;
    this.receiptFile = payload.receiptFile;
    this.createdBy = payload.createdBy;
    this.createdAt = payload.createdAt;
    this.category = payload.category;
    this.date = payload.date;
  }
}
