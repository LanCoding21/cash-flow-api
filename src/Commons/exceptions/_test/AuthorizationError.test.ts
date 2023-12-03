import AuthorizationError from '../AuthorizationError';
import ClientError from '../ClientError';

describe('AuthorizationError', () => {
  it('should create AuthorizationError correctly', () => {
    const err = new AuthorizationError('Not permit');

    expect(err).toBeInstanceOf(AuthorizationError);
    expect(err).toBeInstanceOf(ClientError);
    expect(err).toBeInstanceOf(Error);

    expect(err.message).toBe('Not permit');
    expect(err.name).toBe('AuthorizationError');
    expect(err.statusCode).toBe(403);
  });
});
