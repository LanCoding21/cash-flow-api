/* eslint-disable class-methods-use-this */
import * as jwt from 'jsonwebtoken';
import TokenManager from '../../Applications/security/TokenManager';
import AuthenticationError from '../../Commons/exceptions/AuthenticationError';

export default class JwtTokenManager extends TokenManager {
  createAccessToken(payload: any): string {
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY!, {
      expiresIn: '30s',
    });
    return token;
  }

  createRefreshToken(payload: any): string {
    const token = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY!, {});
    return token;
  }

  verifyAccessToken(token: string): void {
    try {
      jwt.verify(token, process.env.ACCESS_TOKEN_KEY!);
    } catch (error) {
      throw new AuthenticationError('Token is invalid');
    }
  }

  verifyRefreshToken(token: string): void {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN_KEY!);
    } catch (error) {
      throw new AuthenticationError('Token is invalid');
    }
  }

  decodePayload(token: string) {
    const decoded = jwt.decode(token);
    return decoded;
  }
}
