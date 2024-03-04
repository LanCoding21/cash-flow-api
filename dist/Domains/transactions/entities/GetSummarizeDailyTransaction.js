"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetSummarizeDailyTransaction {
    constructor(payload) {
        this.dateStart = payload.dateStart;
        this.dateEnd = payload.dateEnd;
        this.ownerId = payload.ownerId;
    }
}
exports.default = GetSummarizeDailyTransaction;
