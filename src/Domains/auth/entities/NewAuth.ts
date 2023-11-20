interface INewAuthPayload {
  accessToken: string;
  refreshToken: string;
}

export default class NewAuth {
  accessToken: string;
  refreshToken: string;

  constructor(payload: INewAuthPayload) {
    this.verifyPayload(payload);

    this.accessToken = payload.accessToken;
    this.refreshToken = payload.refreshToken;
  }

  verifyPayload(payload: INewAuthPayload) {
    const { accessToken, refreshToken } = payload;
    if (!accessToken || !refreshToken) {
      throw new Error("NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY");
    }
  }
}
