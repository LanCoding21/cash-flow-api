"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetAllCategory {
    constructor(payload) {
        this.ownerId = payload.ownerId;
        this.type = payload.type;
        this.limit = payload.limit;
        this.offset = payload.offset;
        this.searchText = payload.searchText;
    }
}
exports.default = GetAllCategory;
