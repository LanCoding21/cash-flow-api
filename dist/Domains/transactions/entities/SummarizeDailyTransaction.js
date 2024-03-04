"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SummarizeDailyTransaction {
    constructor(payload) {
        this.date = payload.date;
        this.type = payload.type;
        this.amount = payload.amount;
        this.category = payload.category;
    }
}
exports.default = SummarizeDailyTransaction;
