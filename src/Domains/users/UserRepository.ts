/* eslint-disable @typescript-eslint/no-unused-vars */
import RegisterUser from './entities/RegisterUser';
import User from './entities/User';

export default class UserRepository {
  async verifyAvailableEmail(email: string) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async addUser(payload: RegisterUser) {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getUserById(id: number): Promise<User> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getUserByEmail(email: string): Promise<User> {
    throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}
