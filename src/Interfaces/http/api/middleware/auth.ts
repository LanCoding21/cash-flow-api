import { NextFunction, Request, Response } from 'express';
import AuthorizationError from '../../../../Commons/exceptions/AuthorizationError';
import container from '../../../../Infrastructures/container';
import TokenManager from '../../../../Applications/security/TokenManager';
import AuthenticationError from '../../../../Commons/exceptions/AuthenticationError';

export interface IUserAuthRequest extends Request {
  user_id?: number;
}

export default function auth() {
  const callback = async (
    req: IUserAuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(new AuthorizationError('Unauthorized'));
    }
    const token = authorizationHeader.split('Bearer ')[1];
    if (!token) {
      return next(new AuthorizationError('Unauthorized'));
    }

    try {
      const tokenManager: TokenManager = container.getInstance(
        TokenManager.name,
      );
      tokenManager.verifyAccessToken(token);

      const decoded = tokenManager.decodePayload(token);

      req.user_id = decoded.user_id;
    } catch (error) {
      return next(new AuthenticationError('Invalid token'));
    }
    return next();
  };

  return callback;
}
