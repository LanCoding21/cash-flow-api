import AuthRepository from '../../../Domains/auth/AuthRepository';
import UserRepository from '../../../Domains/users/UserRepository';
import TokenManager from '../../security/TokenManager';

interface IRefreshAccessTokenUseCase {
  tokenManager: TokenManager;
  authRepository: AuthRepository;
  userRepository: UserRepository;
}

export default class RefreshAccessTokenUseCase {
  tokenManager: TokenManager;

  authRepository: AuthRepository;

  userRepository: UserRepository;

  constructor(payload: IRefreshAccessTokenUseCase) {
    this.tokenManager = payload.tokenManager;
    this.authRepository = payload.authRepository;
    this.userRepository = payload.userRepository;
  }

  async execute(refreshToken: string) {
    this.tokenManager.verifyRefreshToken(refreshToken);
    await this.authRepository.checkAvailabilityToken(refreshToken);

    const payload = this.tokenManager.decodePayload(refreshToken);
    const accessToken = this.tokenManager.createAccessToken({
      user_id: payload.user_id,
    });
    return accessToken;
  }
}
