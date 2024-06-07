export interface IGetAllPayload {
  limit?: number;
  offset?: number;
  searchText?: string;
  orderBy?: string[] | string;
}

export default class GetAllPayload {
  limit?: number;

  offset?: number;

  searchText?: string;

  orderBy: any[];

  constructor(payload: IGetAllPayload) {
    const { offset, limit, orderBy } = payload;

    this.limit = payload.limit;
    this.searchText = payload.searchText;

    const skip = offset && limit ? (offset - 1) * limit : undefined;
    this.offset = skip;

    const arr = [];
    if (typeof orderBy === 'string') {
      const [column, direction] = orderBy.split('-');
      const obj: any = {};
      obj[column] = direction;
      arr.push(obj);
    } else {
      (orderBy || []).forEach((ob) => {
        const [column, direction] = ob.split('-');
        const obj: any = {};
        obj[column] = direction;
        arr.push(obj);
      });
    }

    this.orderBy = arr;
  }
}
