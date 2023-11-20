interface IUpdateCategoryPayload {
  name: string;
  type: string;
}

export default class UpdateCategory {
  name: string;

  type: string;

  constructor(payload: IUpdateCategoryPayload) {
    this.name = payload.name;
    this.type = payload.type;
  }

  verifyPayload(payload: IUpdateCategoryPayload) {
    const { name, type } = payload;

    if (!name || !type) {
      throw new Error('CREATE_CATEGORY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (!['INCOME', 'EXPENSE'].includes(type)) {
      throw new Error('CREATE_CATEGORY.TYPE_IS_INVALID');
    }
  }
}
