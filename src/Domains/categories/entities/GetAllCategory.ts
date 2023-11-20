interface IGetAllCategoriesPayload {
  ownerId?: number;
  type?: string;
  limit?: number;
  offset?: number;
  searchText?: string;
}

export default class GetAllCategory {
  ownerId?: number;

  type?: string;

  limit?: number;

  offset?: number;

  searchText?: string;

  constructor(payload: IGetAllCategoriesPayload) {
    this.ownerId = payload.ownerId;
    this.type = payload.type;
    this.limit = payload.limit;
    this.offset = payload.offset;
    this.searchText = payload.searchText;
  }
}
