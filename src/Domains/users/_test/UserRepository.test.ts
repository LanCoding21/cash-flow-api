import UserRepository from '../UserRepository';
import RegisterUser from '../entities/RegisterUser';

describe('UserRepository', () => {
  const userRepository = new UserRepository();

  describe('UserRepository.verifyAvailableEmail', () => {
    it('should throw error when invoke abstract method', async () => {
      await expect(
        userRepository.verifyAvailableEmail('john@mail.com'),
      ).rejects.toThrow('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });
  });

  describe('UserRepository.addUser', () => {
    it('should throw error when invoke abstract method', async () => {
      const registerUser = new RegisterUser({
        email: 'john@doe.com',
        fullName: 'John',
        password: 'password',
      });

      await expect(userRepository.addUser(registerUser)).rejects.toThrow(
        'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED',
      );
    });
  });

  describe('UserRepository.getUserById', () => {
    it('should throw error when invoke abstract method', async () => {
      await expect(userRepository.getUserById(1)).rejects.toThrow(
        'USER_REPOSITORY.METHOD_NOT_IMPLEMENTED',
      );
    });
  });

  describe('UserRepository.getUserByEmail', () => {
    it('should throw error when invoke abstract method', async () => {
      await expect(
        userRepository.getUserByEmail('john@doe.com'),
      ).rejects.toThrow('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });
  });
});
