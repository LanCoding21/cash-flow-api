import UserRepository from '../../../Domains/users/UserRepository';

interface IGetUserByIdUseCasePayload {
  userRepository: UserRepository;
}

export default class GetUserByIdUseCase {
  userRepository: UserRepository;

  constructor(payload: IGetUserByIdUseCasePayload) {
    this.userRepository = payload.userRepository;
  }

  async execute(id: number) {
    const user = await this.userRepository.getUserById(id);

    delete user.password;

    return user;
  }
}
