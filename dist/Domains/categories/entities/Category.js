"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Category {
    constructor(payload) {
        this.verifyPayload(payload);
        this.id = payload.id;
        this.name = payload.name;
        this.type = payload.type;
        this.ownerId = payload.ownerId;
    }
    verifyPayload(payload) {
        const { name, type, ownerId } = payload;
        if (!name || !type || !ownerId) {
            throw new Error('CATEGORY.NOT_CONTAIN_NEEDED_PROPERTY');
        }
        if (!['INCOME', 'EXPENSE'].includes(type)) {
            throw new Error('CATEGORY.TYPE_IS_INVALID');
        }
    }
}
exports.default = Category;
