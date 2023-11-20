export interface IGetAllTransactionPayload {
  ownerId?: number;
  type?: string;
  limit?: number;
  offset?: number;
  searchText?: string;
  date?: string;
  categoryId?: number;
}

export default class GetAllTransaction {
  ownerId?: number;

  type?: string;

  limit?: number;

  offset?: number;

  date?: string;

  searchText?: string;

  categoryId?: number;

  constructor(payload: IGetAllTransactionPayload) {
    this.ownerId = payload.ownerId;
    this.type = payload.type;
    this.limit = payload.limit;
    this.offset = payload.offset;
    this.searchText = payload.searchText;
    this.date = payload.date;
    this.categoryId = payload.categoryId;
  }
}
