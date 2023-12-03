import NewAuth from '../NewAuth';

describe('NewAuth entities', () => {
  it('should create NewAuth entities correctly', () => {
    const payload = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };

    const newAuth = new NewAuth(payload);

    expect(newAuth.accessToken).toEqual(payload.accessToken);
    expect(newAuth.refreshToken).toEqual(payload.refreshToken);
  });
});
