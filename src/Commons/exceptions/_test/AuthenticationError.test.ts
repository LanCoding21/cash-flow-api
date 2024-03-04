import AuthenticationError from '../AuthenticationError';
import ClientError from '../ClientError';

describe('AuthenticationError', () => {
  it('should create AuthenticationError correctly', () => {
    const authError = new AuthenticationError('Invalid token');

    expect(authError).toBeInstanceOf(AuthenticationError);
    expect(authError).toBeInstanceOf(ClientError);
    expect(authError).toBeInstanceOf(Error);
    expect(authError.message).toBe('Invalid token');
    expect(authError.name).toBe('AuthenticationError');
    expect(authError.statusCode).toBe(401);
  });
});
