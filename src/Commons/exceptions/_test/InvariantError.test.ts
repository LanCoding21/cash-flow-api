import ClientError from '../ClientError';
import InvariantError from '../InvariantError';

describe('InvariantError', () => {
  it('should create InvariantError correctly', () => {
    const err = new InvariantError('Error');

    expect(err).toBeInstanceOf(InvariantError);
    expect(err).toBeInstanceOf(ClientError);
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe('InvariantError');
    expect(err.message).toBe('Error');
    expect(err.statusCode).toBe(400);
  });
});
