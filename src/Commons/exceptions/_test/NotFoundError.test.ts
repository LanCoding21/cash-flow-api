import ClientError from '../ClientError';
import NotFoundError from '../NotFoundError';

describe('NotFoundError', () => {
  it('should create NotFoundError correctly', () => {
    const err = new NotFoundError('Not found');

    expect(err).toBeInstanceOf(NotFoundError);
    expect(err).toBeInstanceOf(ClientError);
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe('NotFoundError');
    expect(err.statusCode).toBe(404);
    expect(err.message).toBe('Not found');
  });
});
