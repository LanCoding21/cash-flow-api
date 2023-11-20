export interface IGetSummarizeDailyTransactionPayload {
  dateStart: string;
  dateEnd: string;
  ownerId: number;
}

export default class GetSummarizeDailyTransaction {
  dateStart: string;

  dateEnd: string;

  ownerId: number;

  constructor(payload: IGetSummarizeDailyTransactionPayload) {
    this.dateStart = payload.dateStart;
    this.dateEnd = payload.dateEnd;
    this.ownerId = payload.ownerId;
  }
}
