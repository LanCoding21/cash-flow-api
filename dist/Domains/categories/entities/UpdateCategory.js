"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateCategory {
    constructor(payload) {
        this.name = payload.name;
        this.type = payload.type;
    }
    verifyPayload(payload) {
        const { name, type } = payload;
        if (!name || !type) {
            throw new Error('CREATE_CATEGORY.NOT_CONTAIN_NEEDED_PROPERTY');
        }
        if (!['INCOME', 'EXPENSE'].includes(type)) {
            throw new Error('CREATE_CATEGORY.TYPE_IS_INVALID');
        }
    }
}
exports.default = UpdateCategory;
