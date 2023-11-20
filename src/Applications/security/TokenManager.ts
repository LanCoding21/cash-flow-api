/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */
export default class TokenManager {
  createRefreshToken(payload: any): string {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  createAccessToken(payload: any): string {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  verifyRefreshToken(token: string) {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  verifyAccessToken(token: string) {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  decodePayload(token: string): any {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }
}
