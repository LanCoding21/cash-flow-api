interface ISummarizeDailyTransactionPayload {
  date: string;
  type: string;
  amount: number;
  category: string;
}

export default class SummarizeDailyTransaction {
  date: string;

  type: string;

  amount: number;

  category: string;

  constructor(payload: ISummarizeDailyTransactionPayload) {
    this.date = payload.date;
    this.type = payload.type;
    this.amount = payload.amount;
    this.category = payload.category;
  }
}
