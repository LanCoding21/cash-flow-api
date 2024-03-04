"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Transaction {
    constructor(payload) {
        this.id = payload.id;
        this.type = payload.type;
        this.description = payload.description;
        this.categoryId = payload.categoryId;
        this.ownerId = payload.ownerId;
        this.amount = payload.amount;
        this.receiptFile = payload.receiptFile;
        this.createdBy = payload.createdBy;
        this.createdAt = payload.createdAt;
        this.category = payload.category;
        this.date = payload.date;
    }
}
exports.default = Transaction;
