import AuthRepository from '../../../Domains/auth/AuthRepository';
import NewAuth from '../../../Domains/auth/entities/NewAuth';
import UserRepository from '../../../Domains/users/UserRepository';
import LoginUser from '../../../Domains/users/entities/LoginUser';
import PasswordHash from '../../security/PasswordHash';
import TokenManager from '../../security/TokenManager';

interface ILoginUserUseCasePayload {
  userRepository: UserRepository;
  passwordHash: PasswordHash;
  authRepository: AuthRepository;
  tokenManager: TokenManager;
}

export default class LoginUserUseCase {
  userRepository: UserRepository;

  passwordHash: PasswordHash;

  authRepository: AuthRepository;

  tokenManager: TokenManager;

  constructor(payload: ILoginUserUseCasePayload) {
    this.userRepository = payload.userRepository;
    this.passwordHash = payload.passwordHash;
    this.authRepository = payload.authRepository;
    this.tokenManager = payload.tokenManager;
  }

  async execute(useCasePayload: any) {
    const loginUser = new LoginUser(useCasePayload);
    const user = await this.userRepository.getUserByEmail(loginUser.email);

    await this.passwordHash.comparePassword(loginUser.password, user.password!);

    const payload = { user_id: user.id };

    const accessToken = this.tokenManager.createAccessToken(payload);
    const refreshToken = this.tokenManager.createRefreshToken(payload);

    await this.authRepository.addToken(refreshToken);

    return new NewAuth({ accessToken, refreshToken });
  }
}
