"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateTransaction {
    constructor(payload) {
        this.verifyPayload(payload);
        this.type = payload.type;
        this.description = payload.description;
        this.categoryId = payload.categoryId;
        this.ownerId = payload.ownerId;
        this.amount = payload.amount;
        this.receiptFile = payload.receiptFile;
        this.createdBy = payload.createdBy;
        this.date = payload.date;
    }
    verifyPayload(payload) {
        const { type, amount } = payload;
        if (amount < 1)
            throw new Error('CREATE_TRANSACTION.AMOUNT_IS_INVALID');
        if (!['INCOME', 'EXPENSE'].includes(type)) {
            throw new Error('CREATE_TRANSACTION.TYPE_IS_INVALID');
        }
    }
}
exports.default = CreateTransaction;
