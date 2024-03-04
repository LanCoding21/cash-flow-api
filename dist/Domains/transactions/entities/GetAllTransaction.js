"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetAllTransaction {
    constructor(payload) {
        this.ownerId = payload.ownerId;
        this.type = payload.type;
        this.limit = payload.limit;
        this.offset = payload.offset;
        this.searchText = payload.searchText;
        this.date = payload.date;
        this.categoryId = payload.categoryId;
    }
}
exports.default = GetAllTransaction;
