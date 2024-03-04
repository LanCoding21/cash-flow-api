"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCategory {
    constructor(payload) {
        this.verifyPayload(payload);
        this.name = payload.name;
        this.type = payload.type;
        this.ownerId = payload.ownerId;
    }
    verifyPayload(payload) {
        const { name, type, ownerId } = payload;
        if (!name || !type || !ownerId) {
            throw new Error('CREATE_CATEGORY.NOT_CONTAIN_NEEDED_PROPERTY');
        }
        if (!['INCOME', 'EXPENSE'].includes(type)) {
            throw new Error('CREATE_CATEGORY.TYPE_IS_INVALID');
        }
    }
}
exports.default = CreateCategory;
