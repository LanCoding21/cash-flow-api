import UserRepository from '../../../Domains/users/UserRepository';
import RegisterUser from '../../../Domains/users/entities/RegisterUser';
import PasswordHash from '../../security/PasswordHash';

interface IAddUserUseCasePayload {
  userRepository: UserRepository;
  passwordHash: PasswordHash;
}

export default class AddUserUseCase {
  userRepository: UserRepository;

  passwordHash: PasswordHash;

  constructor(payload: IAddUserUseCasePayload) {
    this.userRepository = payload.userRepository;
    this.passwordHash = payload.passwordHash;
  }

  async execute(useCasePayload: any) {
    const registerUser = new RegisterUser(useCasePayload);
    await this.userRepository.verifyAvailableEmail(registerUser.email);
    registerUser.password = await this.passwordHash.hash(registerUser.password);

    return this.userRepository.addUser(registerUser);
  }
}
