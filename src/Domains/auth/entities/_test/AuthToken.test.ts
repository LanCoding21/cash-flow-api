import AuthToken from '../AuthToken';

describe('AuthToken entities', () => {
  it('should create AuthToken entities correctly', () => {
    const payload = {
      id: 1,
      token: 'token',
    };

    const authToken = new AuthToken(payload);

    expect(authToken.id).toEqual(payload.id);
    expect(authToken.token).toEqual(payload.token);
  });
});
