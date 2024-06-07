import GetAllPayload, {
  IGetAllPayload,
} from '../../common/entities/GetAllPayload';

export interface IGetAllCategoriesPayload extends IGetAllPayload {
  ownerId?: number;
  type?: string;
}

export default class GetAllCategory extends GetAllPayload {
  ownerId?: number;

  type?: string;

  constructor(payload: IGetAllCategoriesPayload) {
    super(payload);
    this.ownerId = payload.ownerId;
    this.type = payload.type;
  }
}
