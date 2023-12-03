import RegisterUser from '../RegisterUser';

describe('RegisterUser entities', () => {
  it('should throw error when password is < 8', () => {
    const payload = {
      email: 'test@test.com',
      password: '-',
      fullName: 'John',
    };

    expect(() => new RegisterUser(payload)).toThrow(
      'REGISTER_USER.PASSWORD_MINIMUM_CHARACTER',
    );
  });

  it('should throw error when not supplied valid email', () => {
    const payload = {
      email: 'email',
      password: 'Supersecretpassword',
      fullName: 'John',
    };

    expect(() => new RegisterUser(payload)).toThrow(
      'REGISTER_USER.EMAIL_NOT_VALID',
    );
  });

  it('should create login user entities correctly', () => {
    const payload = {
      email: 'john@doe.com',
      password: 'Supersecretpassword',
      fullName: 'John',
    };

    const regiserUser = new RegisterUser(payload);

    expect(payload.email).toEqual(regiserUser.email);
    expect(payload.password).toEqual(regiserUser.password);
    expect(payload.fullName).toEqual(regiserUser.fullName);
  });
});
