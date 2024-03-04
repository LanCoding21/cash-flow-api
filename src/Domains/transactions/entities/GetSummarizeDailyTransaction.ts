export interface IGetSummarizeDailyTransactionPayload {
  dateStart: string;
  dateEnd: string;
  ownerId: number;
}

export default class GetSummarizeDailyTransaction {
  dateStart: Date;

  dateEnd: Date;

  ownerId: number;

  constructor(payload: IGetSummarizeDailyTransactionPayload) {
    this.dateStart = new Date(payload.dateStart);
    this.dateEnd = new Date(payload.dateEnd);
    this.ownerId = payload.ownerId;
  }
}
