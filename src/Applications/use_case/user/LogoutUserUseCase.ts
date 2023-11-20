import AuthRepository from '../../../Domains/auth/AuthRepository';
import LogoutAuth from '../../../Domains/auth/entities/LogoutAuth';
import TokenManager from '../../security/TokenManager';

interface ILogoutUserUseCasePayload {
  tokenManager: TokenManager;
  authRepository: AuthRepository;
}

export default class LogoutUserUseCase {
  tokenManager: TokenManager;

  authRepository: AuthRepository;

  constructor(payload: ILogoutUserUseCasePayload) {
    this.tokenManager = payload.tokenManager;
    this.authRepository = payload.authRepository;
  }

  async execute(useCasePayload: any) {
    const logoutAuth = new LogoutAuth(useCasePayload);

    this.tokenManager.verifyRefreshToken(logoutAuth.refreshToken);
    await this.authRepository.checkAvailabilityToken(logoutAuth.refreshToken);

    const curr = await this.authRepository.getToken(logoutAuth.refreshToken);
    this.authRepository.deleteTokenById(curr.id);
  }
}
