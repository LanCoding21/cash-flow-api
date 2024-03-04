import AuthRepository from '../AuthRepository';

describe('AuthRepository interface', () => {
  it('should throw error when invoke unimplemented method', async () => {
    const authRepository = new AuthRepository();

    await expect(authRepository.addToken('')).rejects.toThrow(
      'AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(authRepository.checkAvailabilityToken('')).rejects.toThrow(
      'AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(authRepository.deleteToken('')).rejects.toThrow(
      'AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
    await expect(authRepository.getToken('')).rejects.toThrow(
      'AUTH_REPOSITORY.METHOD_NOT_IMPLEMENTED',
    );
  });
});
