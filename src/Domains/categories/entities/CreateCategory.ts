interface ICreateCategoryPayload {
  name: string;
  type: string;
  ownerId: number;
}

export default class CreateCategory {
  name: string;

  type: string;

  ownerId: number;

  constructor(payload: ICreateCategoryPayload) {
    this.name = payload.name;
    this.type = payload.type;
    this.ownerId = payload.ownerId;
  }

  verifyPayload(payload: ICreateCategoryPayload) {
    const { name, type, ownerId } = payload;

    if (!name || !type || !ownerId) {
      throw new Error('CREATE_CATEGORY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (!['INCOME', 'EXPENSE'].includes(type)) {
      throw new Error('CREATE_CATEGORY.TYPE_IS_INVALID');
    }
  }
}
