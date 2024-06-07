import GetAllPayload, {
  IGetAllPayload,
} from '../../common/entities/GetAllPayload';

export interface IGetAllTransactionPayload extends IGetAllPayload {
  ownerId?: number;
  type?: string;
  date?: string;
  categoryId?: number;
}

export default class GetAllTransaction extends GetAllPayload {
  ownerId?: number;

  type?: string;

  date?: string;

  categoryId?: number;

  constructor(payload: IGetAllTransactionPayload) {
    super(payload);
    this.ownerId = payload.ownerId;
    this.type = payload.type;
    this.date = payload.date;
    this.categoryId = payload.categoryId;
  }
}
