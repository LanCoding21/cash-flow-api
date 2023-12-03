import User from '../User';

describe('User entities', () => {
  it('should throw error if email not valid', () => {
    const payload = {
      id: 1,
      fullName: 'John',
      email: 'john',
      password: 'password',
    };

    expect(() => new User(payload)).toThrow('USER.EMAIL_NOT_VALID');
  });

  it('should create user entity correctly', () => {
    const payload = {
      fullName: 'John',
      id: 1,
      email: 'john@mail.com',
      password: 'Supersecretpassword',
    };

    const user = new User(payload);

    expect(user.fullName).toEqual(payload.fullName);
    expect(user.id).toEqual(payload.id);
    expect(user.email).toEqual(payload.email);
    expect(user.password).toEqual(payload.password);
  });
});
