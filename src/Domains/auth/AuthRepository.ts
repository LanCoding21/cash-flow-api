/* eslint-disable class-methods-use-this */

import AuthToken from './entities/AuthToken';

/* eslint-disable @typescript-eslint/no-unused-vars */
export default class AuthRepository {
  async addToken(token: string) {
    throw new Error('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async checkAvailabilityToken(token: string) {
    throw new Error('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteToken(token: string) {
    throw new Error('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteTokenById(id: number) {
    throw new Error('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getToken(token: string): Promise<AuthToken> {
    throw new Error('AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}
