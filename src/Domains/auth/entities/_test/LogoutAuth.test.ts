import LogoutAuth from '../LogoutAuth';

describe('LogoutAuth entities', () => {
  it('should create LogoutAuth entities correctly', () => {
    const payload = {
      refreshToken: 'token',
    };

    const logoutAuth = new LogoutAuth(payload);

    expect(logoutAuth.refreshToken).toEqual(payload.refreshToken);
  });
});
