interface ILogoutAuthPayload {
  refreshToken: string;
}

export default class LogoutAuth {
  refreshToken: string;

  constructor(payload: ILogoutAuthPayload) {
    this.verifyPayload(payload);
    this.refreshToken = payload.refreshToken;
  }

  verifyPayload(payload: ILogoutAuthPayload) {
    const { refreshToken } = payload;
    if (!refreshToken) {
      throw new Error('LOGOUT_AUTH.NOT_CONTAIN_NEEDED_PROPERTY');
    }
    if (typeof refreshToken !== 'string') {
      throw new Error('LOGOUT_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}
